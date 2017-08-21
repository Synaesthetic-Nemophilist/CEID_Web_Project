angular.module('adminApp', ['adminControllers', 'adminServices']);
angular.module('localEmpApp', ['Local_EmpServices','Local_EmpControllers']);


angular.module('systemApp', ['Routes','adminApp','mainControllers']);

