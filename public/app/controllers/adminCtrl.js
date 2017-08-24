angular.module('adminControllers', ['adminServices', 'localStoreServices'])

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


    .controller('adminCrudCtrl', function (LocalStore) {

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

        // For deleting the selected book TODO: DOES NOT WORK YET!: implement delete path in back end
        vm.delLocalStore = function () {
            let localStoreId = vm.selectedLocalStore.id;
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

    });



