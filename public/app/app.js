angular.module('adminApp', ['adminControllers', 'adminServices']);
angular.module('localEmpApp', ['localEmpControllers', 'localEmpServices', ]);


angular.module('systemApp', ['Routes','adminApp', 'localEmpApp', 'mainControllers']);

