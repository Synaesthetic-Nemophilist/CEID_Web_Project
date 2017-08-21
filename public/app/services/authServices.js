angular.module('authServices', [])

    .factory('Auth', function ($http) {
        let authFactory = {};

        authFactory.create = (regData) => {
            return $http.post('/api/admin', regData)
        };

        return authFactory;
    });