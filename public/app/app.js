angular.module('adminApp', ['adminControllers', 'adminServices']);
angular.module('localEmpApp', ['localEmpServices','localEmpControllers']);


angular.module('systemApp', ['Routes','adminApp','localEmpApp','mainControllers']);

