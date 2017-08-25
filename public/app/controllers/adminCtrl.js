angular.module('adminControllers', ['adminServices', 'localStoreServices', 'localEmpServices'])

    .controller('regCtrl', function ($http, $location, $timeout, Admin) {

        //for making ctrl vars public to scope
        let vm = this;

        vm.regAdmin = (regData) => {
            vm.loading = true;
            vm.errorMsg = false;

            Admin.create(vm.regData)
                .then(function (data) {
                    if(data.data.success) {
                        vm.loading = false;  // remove spinner
                        vm.successMsg = data.data.message + '...Redirecting';  // show success msg
                        // Redirect to home page
                        $timeout(function () {
                            $location.path('/');
                        }, 2000);
                    } else {
                        vm.loading = false;  // remove spinner
                        vm.errorMsg = data.data.message;
                    }
                })
        };
    })


    .controller('adminCrudLsCtrl', function (LocalStore) {

        let vm = this;

        //public vars
        vm.localStores = []; // init List with empty array until GET
        vm.selectedLocalStore = undefined;
        vm.editMode = false;
        vm.addMode = false;

        // Get all localStores from db
        vm.getAllLocalStores = function () {
            LocalStore.getAll()
                .then(function (res) {
                    vm.localStores = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        // render all cities in list
        vm.getAllLocalStores();

        // Choose a localStore and save state, also reset messages
        vm.selectLocalStore = function (ls) {
            vm.selectedLocalStore = ls;
            vm.successMsg = undefined;
            vm.errorMsg = undefined;
        };

        // For activating selected local store in list
        vm.isSelected = function (ls) {
            return vm.selectedLocalStore === ls;
        };

        // Cases for disabling delete button
        vm.disabledDel = function () {
            return vm.selectedLocalStore === undefined || vm.addMode;
        };

        // For when clicking on Edit/Save btn
        vm.toggleEditMode = function () {
            vm.editMode = !vm.editMode;
        };

        vm.resetForm = function () {
            vm.selectedLocalStore = {};
        };

        // Reset form for info insertion
        vm.addLocalStore = function () {
            vm.resetForm();
            vm.addMode = true;
            vm.editMode = true;
        };

        // Depending on mode, POST or PUT data
        vm.saveLocalStore = function () {
            vm.toggleEditMode();
            let localStoreData = vm.selectedLocalStore;
            if(vm.addMode) {
                LocalStore.create(localStoreData)
                    .then(function () {
                        vm.successMsg = 'Data successfully added.';
                        vm.addMode = false;
                        // Render updated list
                        vm.getAllLocalStores();
                    })
                    .catch(function (err) {
                        vm.errorMsg = 'There was an error. Please try again.'
                    });
            }else{
                LocalStore.update(localStoreData)
                    .then(function () {
                        vm.successMsg = 'Data successfully updated.';
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.errorMsg = 'There was an error. Please try again.'
                    });
            }
        };

        // For deleting the selected book
        vm.delLocalStore = function () {
            let localStoreId = vm.selectedLocalStore._id;
            console.log(localStoreId);
            if(confirm('Are you sure you want to delete this book?')) {
                LocalStore.delete(localStoreId)
                    .then(function () {
                        vm.successMsg = 'Local Store successfully deleted.';
                        // Render updated list
                        vm.getAllLocalStores();
                        vm.resetForm();
                        vm.selectedLocalStore = undefined;
                    })
                    .catch(function (err) {
                        vm.errorMsg = 'There was an error. Please try again.';
                    })
            }
        };

    })

    .controller('adminCrudLsEmpCtrl', function (LocalStoreEmp) {
        let vm = this;

        //public vars
        vm.localStoreEmps = []; // init List with empty array until GET
        vm.selectedlocalStoreEmp = undefined;
        vm.editMode = false;
        vm.addMode = false;

        // Get all localStoreEmps from db
        vm.getAllLocalStoreEmps = function () {
            LocalStoreEmp.getAll()
                .then(function (res) {
                    vm.localStoreEmps = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        // render all cities in list
        vm.getAllLocalStoreEmps();

        // Choose a localStoreEmp and save state, also reset messages
        vm.selectlocalStoreEmp = function (ls) {
            vm.selectedlocalStoreEmp = ls;
            vm.successMsg = undefined;
            vm.errorMsg = undefined;
        };

        // For activating selected local store in list
        vm.isSelected = function (ls) {
            return vm.selectedlocalStoreEmp === ls;
        };

        // Cases for disabling delete button
        vm.disabledDel = function () {
            return vm.selectedlocalStoreEmp === undefined || vm.addMode;
        };

        // For when clicking on Edit/Save btn
        vm.toggleEditMode = function () {
            vm.editMode = !vm.editMode;
        };

        vm.resetForm = function () {
            vm.selectedlocalStoreEmp = {};
        };

        // Reset form for info insertion
        vm.addlocalStoreEmp = function () {
            vm.resetForm();
            vm.addMode = true;
            vm.editMode = true;
        };

        // Depending on mode, POST or PUT data
        vm.savelocalStoreEmp = function () {
            vm.toggleEditMode();
            let localStoreEmpData = vm.selectedlocalStoreEmp;
            if(vm.addMode) {
                LocalStoreEmp.create(localStoreEmpData)
                    .then(function () {
                        vm.successMsg = 'Data successfully added.';
                        vm.addMode = false;
                        // Render updated list
                        vm.getAllLocalStoreEmps();
                    })
                    .catch(function (err) {
                        vm.errorMsg = 'There was an error. Please try again.'
                    });
            }else{
                LocalStoreEmp.update(localStoreEmpData)
                    .then(function () {
                        vm.successMsg = 'Data successfully updated.';
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.errorMsg = 'There was an error. Please try again.'
                    });
            }
        };

        // For deleting the selected book
        vm.dellocalStoreEmp = function () {
            let localStoreEmpId = vm.selectedlocalStoreEmp._id;
            console.log(localStoreEmpId);
            if(confirm('Are you sure you want to delete this book?')) {
                LocalStoreEmp.delete(localStoreEmpId)
                    .then(function () {
                        vm.successMsg = 'Local Store successfully deleted.';
                        // Render updated list
                        vm.getAllLocalStoreEmps();
                        vm.resetForm();
                        vm.selectedlocalStoreEmp = undefined;
                    })
                    .catch(function (err) {
                        vm.errorMsg = 'There was an error. Please try again.';
                    })
            }
        };



    });





