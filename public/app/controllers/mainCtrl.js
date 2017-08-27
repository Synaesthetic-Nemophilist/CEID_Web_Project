angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function (Auth, $timeout, $location, $rootScope) {

        let vm = this;

        //Initial vm property values can or may not go here..
        //----
        vm.asAn = undefined;

        // this is executed upon every route change
        $rootScope.$on('$routeChangeStart', function () {
            if(Auth.isLoggedIn()) {
                Auth.getUser().then(function (data) {
                    vm.username = data.data.username;  // username is accessible on front-end now
                    console.log('User '+ vm.username +' is logged in, he is a '+ data.data.is); //TODO: temp, remove this log when not nec anymore

                });
            } else {
                console.log('Failure: User is NOT logged in');
                vm.username = '';
            }
        });

        vm.doLogin = (loginData) => {
            vm.loading = true;
            vm.errorMsg = false;

            Auth.login(vm.loginData, vm.asAn)
                .then(function (data) {
                    if(data.data.success) {
                        vm.loading = false;  // remove spinner
                        vm.successMsg = data.data.message + '...Redirecting';  // show success msg

                        $timeout(function () {
                            vm.loginData = {};  // clear form data
                            vm.successMsg = false;

                            Auth.getUser().then(function (data) {
                                // Redirect to corresponding app based on user type
                                if(data.data.is === "admin") {
                                    $location.path('/controlPanel');
                                } else if(data.data.is === "lsEmp") {
                                    $location.path('/localStoreApp');
                                } else if(data.data.is === "thEmp") {
                                    $location.path('/transitHubApp');
                                }
                            });
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
                vm.asAn = undefined;
                $location.path('/');
            }, 2000);
        };


        // methods to distinguish what kind of user it is
        vm.asAnAdmin = () => {
            vm.asAn = "admin";
        };
        vm.asAnEmpLs = () => {
            vm.asAn = "lsEmp";
        };
        vm.asAnAEmpTh = () => {
            vm.asAn = "thEmp";
        };

    });