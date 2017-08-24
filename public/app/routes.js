angular.module('Routes', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/home.html',
            controller: 'mapCtrl',
            controllerAs: 'map'
        })

        .when('/register', {
            templateUrl: 'app/views/pages/admin/register.html',
            controller: 'regCtrl',
            controllerAs: 'register'
        })

        .when('/login', {
            templateUrl: 'app/views/pages/access/login.html'
        })

        .when('/logout', {
            templateUrl: 'app/views/pages/access/logout.html'
        })

        .when('/controlPanel', {
            templateUrl: 'app/views/pages/admin/controlPanel.html'
        })


        .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
