angular.module('adminApp', ['adminControllers', 'adminServices']);
angular.module('localEmpApp', ['EmpControllers','EmpServices']);


angular.module('systemApp', ['Routes','adminApp','mainControllers']);

