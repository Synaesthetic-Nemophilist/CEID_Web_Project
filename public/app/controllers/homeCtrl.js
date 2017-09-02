angular.module('homeControllers', ['uiGmapgoogle-maps','localStoreServices'])

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })

    .controller('homeCtrl', function (LocalStore, uiGmapGoogleMapApi) {

        //for making ctrl vars public to scope
        let vm = this;




        vm.map = {

            center: {
                latitude:  38.223970,
                longitude: 23.645657
            },
            zoom: 6,
            markers: [],
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



        let loadMarkers = function (){
            LocalStore.getAll()
                .then(function(response) {
                    let stores = response.data;
                    stores.forEach(function(store) {
                        createMarker(store);
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });

        };

        let createMarker = function(data){
            let marker = {
                id: data._id,
                latitude: data.Location.Latitude,
                longitude: data.Location.Longitude
            };
            vm.map.markers.push(marker);
        };

        loadMarkers();




    });
