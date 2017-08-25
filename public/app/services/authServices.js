angular.module('authServices', [])

    // Service with login, login check, logout methods
    .factory('Auth', function ($http, AuthToken) {
        let authFactory = {};

        // method for logging in using authentication and token setting
        authFactory.login = (loginData, asAn) => {
            loginData.is = asAn;
            return $http.post('/api/authenticate', loginData).then(function (data) {
                AuthToken.setToken(data.data.token);
                return data;
            })
        };

        // method for checking if user is logged in via token
        authFactory.isLoggedIn = () => {
            return !!AuthToken.getToken();
        };

        // method for retrieving user info via token
        authFactory.getUser = () => {
            if(AuthToken.getToken()) {
                return $http.post('/api/current');
            } else {
                $q.reject({ message: 'User has no token' });
            }
        };

        // method for logging out (deleting token from browser cookies)
        authFactory.logout = () => {
            AuthToken.setToken();  // we pass no arg, in order for the method to del the token and logout
        };

        return authFactory;
    })

    // Token-based authentication service
    .factory('AuthToken', function ($window) {
        let authTokenFactory = {};

        authTokenFactory.setToken = (token) => {
            if(token) {
                $window.localStorage.setItem('token', token);  // if token passed, we set token as cookie (login)
            } else {
                $window.localStorage.removeItem('token');  // if no token is passed, we want to del token (logout)
            }
        };

        authTokenFactory.getToken = () => {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    })

    // service for attaching tokens to every request
    .factory('AuthInterceptors', function (AuthToken) {
        let authInterceptorsFactory = {};

        authInterceptorsFactory.request = function (config) {
            let token = AuthToken.getToken();

            if(token) config.headers['x-access-token'] = token;

            return config;
        };

        return authInterceptorsFactory;
    });