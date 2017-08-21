angular.module('adminControllers', ['adminServices'])

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
    });



