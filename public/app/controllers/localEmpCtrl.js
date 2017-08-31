angular.module('localEmpControllers', ['localEmpServices', 'packageServices', 'localStoreServices', 'authServices'])

    .controller('packageCtrl', function ($http, $location, $timeout, Package, LocalStore, Auth) {

        //for making ctrl vars public to scope
        let vm = this;

        vm.packages = [];
        vm.selectedpackage = undefined;
        vm.packageToSave = undefined;


        vm.calcPackageDetails = function () {

            // calc unique tracking number
            let initial1 = vm.thisStore.Address.City.substr(0, 2).toUpperCase();
            let initial2 = vm.packageToSave.Delivery_Address.substr(0, 2).toUpperCase();
            vm.packageToSave.Date_Sent = Date.now();
            vm.packageToSave.Tracking_Number = initial1 + vm.packageToSave.Date_Sent + initial2;

            // TODO: this func calculates cost and time based on whether express or not

            savePackage();
        };

        let savePackage = function () {
            let packageData = vm.packageToSave;

            Package.create(packageData)
                .then(function () {
                    vm.successMsg = 'Data successfully added.';

                    // Render updated list
                    vm.getAllPackages();
                })
                .catch(function (err) {
                    vm.errorMsg = 'There was an error. Please try again.'
                });
        };


        // Get all packages from db
        vm.getAllPackages = function () {
            Package.getAll()
                .then(function (res) {
                    vm.packages = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        // render all packages in list
        vm.getAllPackages();

        // get all stores for the select box
        let getStores = function () {
            LocalStore.getAll()
                .then(function (res) {
                    vm.localStores = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });

        };
        getStores();

        // Get store in which employee is currently working in and make it public to view
        let getThisStore = function () {
            Auth.getUser().then(function (data) {
                LocalStore.getById(data.data.storeId)
                    .then(function (res) {
                        vm.thisStore = res.data;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
        };
        getThisStore();

        // Choose a package and save state, also reset messages
        vm.selectPackage = function (p) {
            vm.selectedpackage = p;
            vm.successMsg = undefined;
            vm.errorMsg = undefined;
        };

        // For activating selected package in list
        vm.isSelected = function (p) {
            return vm.selectedpackage === p;
        };


        //Utility methods -----

        vm.allfieldsOk = function (form) {
            return form.$valid
        };

        vm.cancelEdit = function () {
            vm.resetForm();
        };

        vm.resetForm = function () {
            vm.packageToSave = {};
        };


    });