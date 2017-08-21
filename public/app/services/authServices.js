angular.module('authServices', [])

    .factory('Auth', function ($http) {
        let authFactory = {};

        authFactory.login = (loginData) => {
            return $http.post('/api/authenticate', loginData);
        };

        return authFactory;
    });