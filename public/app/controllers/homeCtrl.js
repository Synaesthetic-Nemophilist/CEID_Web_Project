angular.module('homeControllers', ['uiGmapgoogle-maps'])

    .controller('homeCtrl', function () {

        //for making ctrl vars public to scope
        let vm = this;


        angular.extend(vm, {
            map: {

                center: {
                    latitude:  38.223970,
                    longitude: 23.645657
                },
                zoom: 6,
                markers: [{
                    id: "Alexandroupoli",
                    latitude: 40.8562833,
                    longitude: 25.8642735

                },{
                    id: "Ηράκλειο",
                    latitude: 35.3397899,
                    longitude: 25.1477693

                },{
                    id: "Ασπρόπυργος",
                    latitude: 38.0565795,
                    longitude: 23.587001

                },{
                    id: "Πάτρα",
                    latitude: 38.2252024,
                    longitude: 21.739027

                },{
                    id: "Ιοάννινα",
                    latitude: 39.6818260,
                    longitude: 20.8630371

                },{
                    id: "Θεσσαλονίκη",
                    latitude: 40.6723026,
                    longitude: 22.9397766

                },{
                    id: "Λάρισα",
                    latitude: 39.6439608,
                    longitude: 22.4102031

                },{
                    id: "Καλαμάτα",
                    latitude: 37.0421268,
                    longitude: 22.1205741

                },{
                    id: "Μυτιλήνη",
                    latitude: 39.1001524,
                    longitude: 26.5513702

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
                },

            }
        });

        var flightPlanCoordinates = [
            new google.maps.LatLng(37.772323, -122.214897),
            new google.maps.LatLng(21.291982, -157.821856),
            new google.maps.LatLng(-18.142599, 178.431),
            new google.maps.LatLng(-27.46758, 153.027892)
        ];

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);




    });
