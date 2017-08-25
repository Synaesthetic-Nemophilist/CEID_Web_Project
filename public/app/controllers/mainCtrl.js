angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function (Auth, $timeout, $location, $rootScope) {

        let vm = this;

        //Initial vm property values can or may not go here..
        //----

        // this is executed upon every route change
        $rootScope.$on('$routeChangeStart', function () {
            if(Auth.isLoggedIn()) {
                console.log('User is logged in'); //TODO: temp, remove this log when not nec anymore
                Auth.getUser().then(function (data) {
                    vm.username = data.data.username;  // username is accessible on front-end now
                });
            } else {
                console.log('Failure: User is NOT logged in');
                vm.username = '';
            }
        });

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
                            vm.loginData = {};  // clear form data
                            vm.successMsg = false;

                            // Redirect to corresponding app based on user type
                            if(data.data.token.is === "admin") {
                                $location.path('/controlPanel');
                            } else if(data.data.token.is === "lsEmp") {
                                $location.path('/localStoreApp');
                            } else if(data.data.token.is === "thEmp") {
                                $location.path('/transitHubApp');
                            }
                        }, 2000);
                    } else {
                        vm.loading = false;  // remove spinner
                        vm.errorMsg = data.data.message;
                    }
                })
        };

        vm.logout = () => {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');
            }, 2000);
        };

    });