

angular.module('homeCtrl', [])

    .controller('mapCtrl', function () {

        //for making ctrl vars public to scope
        let vm = this;

        vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };


    });
