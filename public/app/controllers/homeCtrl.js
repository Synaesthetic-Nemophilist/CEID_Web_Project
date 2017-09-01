angular.module('homeControllers', ['uiGmapgoogle-maps','localStoreServices'])

    .controller('homeCtrl', function (LocalStore) {

        //for making ctrl vars public to scope
        let vm = this;



        vm.map = {

                center: {
                    latitude:  38.223970,
                    longitude: 23.645657
                },
                zoom: 6,
                markers: [{
                    id: "Αλεξανδρούπολη",
                    latitude: 40.8562833,
                    longitude: 25.8642735

                }],
                markersEvents: {
                    click: function(marker, eventName, model) {
                        vm.map.window.model = model;
                        vm.map.window.show = true;
                    }
                },

                window: {
                    marker: {},
                    show: false,
                    closeClick: function() {
                        this.show = false;
                    },
                    options: {}
                },

            };


        vm.loadMarkers = function (){
          LocalStore.getAll()
              .then(function (res) {
                  for (i = 0; i < res.data.length ; i++ ){
                      createMarker(res.data[i]);

                  }

              })
              .catch(function (err) {
                  console.log(err);
              });
        };

        let createMarker = function(data){

            let marker = {
                id: Date.now(),
                coodrs: {
                    latitude: data.Location.Latitude,
                    longitude: data.Location.Longitude
                }


            };

            console.log("Geia",data.Location);
            vm.map.markers.push(marker);
        };



        vm.loadMarkers();


    });
