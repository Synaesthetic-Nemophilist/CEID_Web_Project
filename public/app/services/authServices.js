angular.module('authServices', [])

    .factory('Auth', function ($http) {
        let authFactory = {};

        authFactory.login = (loginData) => {
            return $http.post('/api/authenticate', loginData).then(function (data) {
                AuthToken.setToken(data.data.token);
                return data;
            })
        };

        return authFactory;
    })

    .factory('AuthToken', function () {
        let authTokenFactory = {};

        authTokenFactory.setToken = (token) => {
            $window.localStorage.setItem('token', token);
        };

        //TODO: GETTOKEN METHOD

        return authTokenFactory;
    });