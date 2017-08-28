angular.module('localEmpControllers', ['localEmpServices', 'packageServices'])

    .controller('packageCtrl', function ($http, $location, $timeout, Local_emp, Package) {

        //for making ctrl vars public to scope
        let vm = this;

        vm.packages = [];
        vm.selectedpackage = undefined;
        vm.packageToSave = undefined;





        vm.calcPackageDetails = function () {



            savePackage();
        };

        savePackage = function () {
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