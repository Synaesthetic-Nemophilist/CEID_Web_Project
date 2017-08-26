angular.module('homeControllers', ['uiGmapgoogle-maps'])

    .controller('homeCtrl', function () {

        //for making ctrl vars public to scope
        let vm = this;


        angular.extend(vm, {
            map: {
                center: {
                    latitude:  40.8562833,
                    longitude: 25.8642735
                },
                zoom: 11,
                markers: [{
                    id: 1,
                    latitude: 40.8562833,
                    longitude: 25.8642735

                }],
                markersEvents: {
                    click: function(marker, eventName, model) {
                        console.log('Click marker');
                        vm.map.window.model = model;
                        vm.map.window.show = true;
                    }
                },
                events: {
                    click: function (map, eventName, originalEventArgs) {
                        console.log("Geiaa");
                        var e = originalEventArgs[0];
                        var lat = e.latLng.lat(),lon = e.latLng.lng();
                        var marker = {
                            id: Date.now(),
                            coords: {
                                latitude: lat,
                                longitude: lon
                            }
                        };
                        vm.map.markers.push(marker);
                        console.log(vm.map.markers);
                        vm.$apply();
                    }
                },
                window: {
                    marker: {},
                    show: false,
                    closeClick: function() {
                        this.show = false;
                    },
                    options: {}
                }
            }
        });

    });
