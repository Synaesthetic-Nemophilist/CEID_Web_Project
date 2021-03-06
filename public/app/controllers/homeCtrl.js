angular.module('homeControllers', ['uiGmapgoogle-maps','localStoreServices','packageServices'])

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })

    .controller('homeCtrl', function (LocalStore, SearchNCache, uiGmapGoogleMapApi, Package, $timeout, $scope) {

        //for making ctrl vars public to scope
        let vm = this;
        vm.errorMsgTn = false;
        vm.errorMsgCode = false;
        vm.errorMsgCity = false;
        vm.storeList = [];

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
                    vm.localStores = response.data;
                    vm.localStores.forEach(function(store) {
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


        vm.viewNetwork = function () {
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

            };  // TODO: Hardcode alert
            createPolylines();
            vm.networkVisible = true;
        };

        vm.hideNetwork = function () {
            vm.map.polylines = [];
            vm.networkVisible = false;
        };


        // Show list, package and package path in map
        vm.submitTn = function(tn){
            Package.getByTn(tn)
                .then(function(response) {

                    vm.searchedPackage = response.data;

                    let path = JSON.stringify({cities: vm.searchedPackage.Full_Path});
                    LocalStore.getPathCoords(path)
                        .then(function (res) {
                            vm.searchedPackage.pathCoords = res.data;

                            console.log(res.data);

                            // Create polyline path from returned coords
                            vm.hideNetwork();
                            vm.map.polylines = [
                                {
                                    id: vm.searchedPackage.Tracking_Number,
                                    path: vm.searchedPackage.pathCoords,
                                    stroke: {
                                        color: '#6060FB',
                                        weight: 3
                                    },
                                    geodesic: true
                                }
                            ];

                        })
                        .catch(function (err) {
                            console.log(err);
                        });

                    // Create the package marker
                    let packageMarker = {
                        id: response.data._id,
                        longitude: response.data.Current_Location.Longitude,
                        latitude: response.data.Current_Location.Latitude,
                        icon: {
                            url: 'assets/pgk.png',
                            scaledSize: { width: 36, height: 36 }
                        }
                    };
                    vm.map.markers.push(packageMarker);
                })
                .catch(function (err) {
                    console.log(err);
                    vm.errorMsgTn = true;
                    $timeout(function () {
                        vm.errorMsgTn = false;
                    }, 5000);
                });
        };


        // API call to find closest store by post code and show info window on map
        vm.submit_pcode = function(pcode){
            LocalStore.getByPcode(pcode)
                .then(function(response) {

                    vm.map.window.model = {
                        id: response.data._id,
                        longitude: response.data.Location.Longitude,
                        latitude: response.data.Location.Latitude,
                        name: response.data.Address.City,
                        street: response.data.Address.Street,
                        number: response.data.Address.Number,
                    };
                    vm.map.window.show = true;
                })
                .catch(function (err) {
                    console.log(err);
                    vm.errorMsgCode = true;
                    $timeout(function () {
                        vm.errorMsgCode = false;
                    }, 5000);
                 });
        };

        $scope.$watch('cityInput', function(val) {
            let payload = { 'q': val};

            if(val !== '' && val !== undefined) {
                SearchNCache.getCity(payload, function (data) {
                    vm.storeList = data;
                });
            } else {
                vm.storeList = [];
            }
        });


        vm.getClass = function () {
            if(vm.searchedPackage && vm.searchedPackage.Hubs_Passed.length > 0) {
                return "col-md-6";
            } else {
                return "col-md-12";
            }
        };

        loadMarkers();
    });
