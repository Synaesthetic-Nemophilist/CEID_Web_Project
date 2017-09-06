angular.module('transitHubEmpControllers', ['webcam', 'bcQrReader'])

    .controller('qrCtrl', function ($rootScope) {

        //for making ctrl vars public to scope
        let vm = this;

        vm.start = function() {
            vm.cameraRequested = true;
            vm.cameraIsOn = true;
        };

        vm.stop = function () {
            vm.cameraRequested = false;
            vm.cameraIsOn = false;
            $rootScope.$broadcast('STOP_WEBCAM');
        };

        vm.processURLfromQR = function (url) {
            vm.url = url;
            vm.cameraRequested = false;
            vm.cameraIsOn = false;
            $rootScope.$broadcast('STOP_WEBCAM');

        };

    });


