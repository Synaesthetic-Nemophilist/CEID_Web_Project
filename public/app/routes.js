let app = angular.module('Routes', ['ngRoute'])

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
                $location.path('controlPanel');  // TODO: When auth generalization happes redirect to respective user case
            }
        }
    });
}]);