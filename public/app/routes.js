angular.module('adminRoutes', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/home.html'
        })

        .when('/about', {
            templateUrl: 'app/views/pages/about.html'
        })

        .when('/register', {
            templateUrl: 'app/views/pages/admin/register.html',
            controller: 'regCtrl',
            controllerAs: 'register'
        })

        .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
