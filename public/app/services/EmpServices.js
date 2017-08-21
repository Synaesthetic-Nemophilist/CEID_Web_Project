angular.module('EmpServices', [])

    .factory('Employee', function ($http) {
        let adminFactory = {};

        adminFactory.create = (regData) => {
            return $http.post('/api/employee', regData)
        };

        return adminFactory;
    });