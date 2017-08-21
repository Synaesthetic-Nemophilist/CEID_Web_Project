angular.module('adminControllers', [])

.controller('regCtrl', function ($http, $location) {

    //for making ctrl vars public to scope
    let vm = this;

    vm.regAdmin = (regData) => {
        vm.loading = true;
        vm.errorMsg = false;

        $http.post('/api/admin', vm.regData)
            .then(function (data) {
                if(data.data.success) {
                    vm.loading = false;  // remove spinner
                    vm.successMsg = data.data.message;  // show success msg
                    $location.path('/');  // redirect admin to home
                } else {
                    vm.loading = false;  // remove spinner
                    vm.errorMsg = data.data.message;
                }
            })
    };



});