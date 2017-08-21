angular.module('localEmpServices', [])

    .factory('localEmp', function ($http) {
        let adminFactory = {};

        adminFactory.create = (regData) => {
            return $http.post('/api/employee', regData)
        };

        return adminFactory;
    });