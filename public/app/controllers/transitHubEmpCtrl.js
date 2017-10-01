angular.module('transitHubEmpControllers', ['webcam', 'bcQrReader', 'authServices', 'transitHubServices', 'packageServices'])

    .controller('qrCtrl', function ($rootScope, $timeout, Auth, TransitHub, Package) {

        //for making ctrl vars public to scope
        let vm = this;

        vm.start = function() {
            vm.cameraRequested = true;
            vm.cameraIsOn = true;
        };

        vm.stop = function () {
            vm.cameraRequested = false;
            vm.cameraIsOn = false;
            $rootScope.$broadcast('STOP_WEBCAM');
        };

        vm.processURLfromQR = function (url) {
            // Close cam
            vm.cameraRequested = false;
            vm.cameraIsOn = false;
            $rootScope.$broadcast('STOP_WEBCAM');

            // Handle data from QR, update package current location..
            vm.url = url;  // url is actually the tracking number
            Package.getByTn(url)
                .then(function (res) {

                    // Update package location info
                    res.data.Current_Location.City = vm.thisHub.Address.City;
                    res.data.Current_Location.Longitude = vm.thisHub.Location.Longitude;
                    res.data.Current_Location.Latitude = vm.thisHub.Location.Latitude;
                    res.data.Hubs_Passed.push({
                        Date: Date.now(),
                        Hub: vm.thisHub._id
                    });

                    Package.update(res.data)
                        .then(function (resUpd) {
                            console.log(resUpd.data.Current_Location.City);
                            console.log(resUpd.data.Delivery_Address);
                            // If package has reached final transit hub, notify local store
                            if(resUpd.data.Current_Location.City === resUpd.data.Delivery_Address) {

                                //Comm.notify('TO_LOCAL_STORE', resUpd.data);
                                resUpd.data.Ready_For_Pickup = true;
                                Package.update(resUpd.data)
                                    .then(function (data) {
                                        //TODO: maybe some msg on mobile app that package is ready to go to local store
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    });
                            }

                            vm.successMsg = 'Package location updated';
                            $timeout(function () {
                                vm.successMsg = undefined;
                                vm.url = undefined;
                            }, 5000);
                        })
                        .catch(function (err) {
                            console.log(err);
                            vm.errorMsg = "Error during update";
                            $timeout(function () {
                                vm.errorMsg = undefined;
                                vm.url = undefined;
                            }, 5000);
                        });
                })
                .catch(function (err) {
                    console.log(err);
                    vm.errorMsg = "QR not valid";
                    $timeout(function () {
                        vm.errorMsg = undefined;
                        vm.url = undefined;
                    }, 5000);
                });
        };


        // Get hub in which employee is currently working in and make it public to view
        let getThisHub = function () {
            Auth.getUser().then(function (data) {
                TransitHub.getById(data.data.hubId)
                    .then(function (res) {
                        vm.thisHub = res.data;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
        };
        getThisHub();

    });


