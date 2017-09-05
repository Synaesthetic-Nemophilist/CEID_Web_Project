angular.module('transitHubEmpControllers', ['webcam', 'bcQrReader'])

    .controller('qrCtrl', function () {

        //for making ctrl vars public to scope
        let vm = this;

        vm.start = function() {
            vm.cameraRequested = true;
        };

        vm.processURLfromQR = function (url) {
            vm.url = url;
            vm.cameraRequested = false;
        }


    });


