angular.module('Local_EmpServices', [])

    .factory('Local_emp', function ($http) {
        let adminFactory = {};

        adminFactory.create = (regData) => {
            return $http.post('/api/employee', regData)
        };

        return adminFactory;
    });