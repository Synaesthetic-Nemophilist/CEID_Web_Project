angular.module('localEmpServices', [])

    .factory('LocalEmp', function ($http) {
        let adminFactory = {};

        adminFactory.create = (regData) => {
            return $http.post('/api/localEmployee', regData)
        };

        return adminFactory;
    });