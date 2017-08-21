angular.module('adminServices', [])

    .factory('Admin', function ($http) {
        let adminFactory = {};

        adminFactory.create = (regData) => {
            return $http.post('/api/admin', regData)
        };

        return adminFactory;
    });