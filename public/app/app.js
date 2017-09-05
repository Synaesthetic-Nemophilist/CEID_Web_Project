angular.module('adminApp', ['adminControllers', 'adminServices', 'localStoreServices', 'transitHubServices']);
angular.module('localEmpApp', ['localEmpControllers', 'localEmpServices', 'packageServices' ]);
angular.module('transitHubEmpApp', ['transitHubEmpControllers']);
angular.module('siteApp', ['homeControllers']);


angular.module('systemApp', ['Routes', 'adminApp', 'localEmpApp', 'transitHubEmpApp', 'siteApp', 'mainController', 'uiGmapgoogle-maps'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');  // intercept all http req with this service
                                                              // which assigns the token to req header
    });

