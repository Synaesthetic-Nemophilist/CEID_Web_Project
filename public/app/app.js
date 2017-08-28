angular.module('adminApp', ['adminControllers', 'adminServices', 'localStoreServices']);
angular.module('localEmpApp', ['localEmpControllers', 'localEmpServices', 'packageServices' ]);
angular.module('siteApp', ['homeControllers']);


angular.module('systemApp', ['Routes', 'adminApp', 'localEmpApp', 'siteApp', 'mainController', 'uiGmapgoogle-maps'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');  // intercept all http req with this service
                                                              // which assigns the token to req header
    });

