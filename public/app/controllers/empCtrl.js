angular.module('Local_EmpControllers', ['Local_EmpServices'])

    .controller('regCtrl', function ($http, $location, $timeout, Local_emp) {

        //for making ctrl vars public to scope
        let vm = this;

        vm.regEmp = (regData) => {
            vm.loading = true;
            vm.errorMsg = false;

            Local_emp.create(vm.regData)
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