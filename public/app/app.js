angular.module('adminApp', ['adminControllers', 'adminServices']);
angular.module('localEmpApp', ['localEmpControllers', 'localEmpServices', ]);


angular.module('systemApp', ['Routes', 'adminApp', 'localEmpApp', 'mainController','uiGmapgoogle-maps'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');  // intercept all http req with this service
                                                              // which assigns the token to req header
    });

