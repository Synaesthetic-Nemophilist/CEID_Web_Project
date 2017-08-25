angular.module('transitHubEmpServices', [])

    .factory('transitHubEmp', function ($http) {
        let transitHubEmpFactory = {};

        transitHubEmpFactory.getAll = () => {
            return $http.get('/api/transitHubEmp');
        };

        transitHubEmpFactory.create = (thEmpData) => {
            return $http.post('/api/transitHubEmp', thEmpData)
        };

        transitHubEmpFactory.update =  (thEmpData) => {
            return $http.put('/api/transitHubEmp/' + thEmpData._id, thEmpData);
        };

        transitHubEmpFactory.delete = (thEmpId) => {
            return $http.delete('/api/transitHubEmp/' + thEmpId);
        };

        return transitHubEmpFactory;
    });