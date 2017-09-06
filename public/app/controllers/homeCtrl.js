angular.module('homeControllers', ['uiGmapgoogle-maps','localStoreServices','packageServices'])

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })

    .controller('homeCtrl', function (LocalStore, uiGmapGoogleMapApi, Package) {

        //for making ctrl vars public to scope
        let vm = this;
        vm.errorMsg = false;

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
                longitude: data.Location.Longitude,
                name: data.Address.City,
                street: data.Address.Street,
                number: data.Address.Number,

            };
            vm.map.markers.push(marker);


        };
        let createPolylines = function () {
            vm.map.polylines = [
                {
                    id: 1,
                    path: [
                        {
                          latitude: 40.8562833,
                          longitude:  25.8642735
                        },{
                          latitude: 35.3397899,
                          longitude:  25.1477693
                        },{
                          latitude: 37.0421268,
                          longitude:  22.1205741
                        },{
                          latitude: 38.2252024,
                          longitude:  21.739027
                        },{
                          latitude: 39.6818260,
                          longitude:  20.8630371
                        },{
                          latitude: 40.6723026,
                          longitude:  22.9397766
                        },{
                          latitude: 40.8562833,
                          longitude:  25.8642735
                        },{
                          latitude: 37.983810,
                          longitude: 23.727539
                        },{
                          latitude: 40.6723026,
                          longitude:  22.9397766
                        },{
                          latitude: 39.6439608,
                          longitude:  22.4102031
                        },{
                          latitude: 40.6723026,
                          longitude: 22.9397766
                        }],
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    }},
                {
                        id: 2,
                        path: [
                        {
                            latitude: 39.6439608,
                            longitude: 22.4102031
                        },{
                            latitude: 37.983810,
                            longitude: 23.727539
                        },{
                            latitude: 38.2252024,
                            longitude: 21.739027
                        }],
                        stroke: {
                        color: '#6060FB',
                        weight: 3
                        }
                },
                {
                    id: 3,
                    path: [
                        {
                            latitude: 37.983810,
                            longitude: 23.727539
                        },{
                            latitude: 37.0421268,
                            longitude: 22.1205741
                        }],
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    }
                },
                {
                    id: 4,
                    path: [
                        {
                            latitude: 37.983810,
                            longitude: 23.727539
                        },{
                            latitude: 35.3397899,
                            longitude: 25.1477693
                        }],
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    }
                },
                {
                    id: 5,
                    path: [
                        {
                            latitude: 37.983810,
                            longitude: 23.727539
                        },{
                            latitude: 39.1001524,
                            longitude: 26.5513702
                        }],
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    }
                },
            ];

        };


        vm.submit_click = function(tn){
            Package.getByTn(tn)
                .then(function(response) {
                    console.log(response);
                    if (response.data === null){
                        vm.errorMsg = true;
                        vm.tnumber = '';
                    }
                    else{
                        let marker = {
                            id: response.data._id,
                            longitude: response.data.Current_Location.Longitude,
                            latitude: response.data.Current_Location.Latitude,
                            icon: {
                                url: 'assets/pgk.png',
                                scaledSize: { width: 36, height: 36 }
                            }
                        };
                        console.log(marker);

                        vm.map.markers.push(marker);
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    });
        };


        vm.submit_pcode = function(pcode){
            LocalStore.getByPcode(pcode)
                .then(function(response) {
                    console.log(response);

                    if (response.data === null){
                        vm.errorMsg = true;
                        vm.tnumber = '';
                    }
                    else{
                    }
                })
                .catch(function (err) {
                    console.log(err);
                 });
        };



        loadMarkers();
        createPolylines();
    });
