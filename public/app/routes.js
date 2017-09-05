let app = angular.module('Routes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {

        $routeProvider

            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })

            .when('/register', {
                templateUrl: 'app/views/pages/admin/register.html',
                controller: 'regCtrl',
                controllerAs: 'register',
                authenticated: false
            })

            .when('/login', {
                templateUrl: 'app/views/pages/access/login.html',
                authenticated: false
            })

            .when('/logout', {
                templateUrl: 'app/views/pages/access/logout.html',
                authenticated: true

            })

            .when('/controlPanel', {
                templateUrl: 'app/views/pages/admin/controlPanel.html',
                authenticated: true
            })

            .when('/localStoreApp', {
                templateUrl: 'app/views/pages/localStore/home.html',
                controller: 'packageCtrl',
                controllerAs: 'pack',
                authenticated: true
            })

            .when('/transitHubApp', {
                templateUrl: 'app/views/pages/transitHub/home.html',
                controller: 'qrCtrl',
                controllerAs: 'qr',
                authenticated: true
            })

            .otherwise({ redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });


// Restrict routes via address bar
app.run(['$rootScope', 'Auth', '$location', function ($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if(next.$$route.authenticated === true) {
            if(!Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path('/');
            }
        } else if(next.$$route.authenticated === false) {
            if(Auth.isLoggedIn()) {
                event.preventDefault();
                Auth.getUser().then(function (data) {
                    if(data.data.is === "admin") {
                        $location.path('/controlPanel');
                    } else if(data.data.is === "lsEmp") {
                        $location.path('/localStoreApp');
                    } else if(data.data.is === "thEmp") {
                        $location.path('/transitHubApp');
                    }
                });
            }
        }
    });
}]);