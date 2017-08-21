angular.module('Routes', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/home.html'
        })

        .when('/admin/register', {
            templateUrl: 'app/views/pages/admin/register.html',
            controller: 'regCtrl',
            controllerAs: 'register'
        })

        .when('/admin/login', {
            templateUrl: 'app/views/pages/admin/login.html'
        })

        .when('/localEmployee/login', {
            templateUrl: 'app/views/pages/admin/login.html'
        })


        .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
