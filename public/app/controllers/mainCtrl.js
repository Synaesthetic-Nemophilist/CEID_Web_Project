angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function (Auth, $timeout, $location) {

        let vm = this;

        vm.doLogin = (loginData) => {
            vm.loading = true;
            vm.errorMsg = false;

            Auth.login(vm.loginData)
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