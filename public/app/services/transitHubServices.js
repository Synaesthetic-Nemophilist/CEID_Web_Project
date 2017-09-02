angular.module('transitHubServices', [])

    .factory('TransitHub', function ($http) {
        let transitHubFactory = {};

        transitHubFactory.getCostGraph = () => {
            return $http.get('app/services/graphs/costs.json');
        };

        transitHubFactory.getTimeGraph = () => {
            return $http.get('app/services/graphs/time.json');
        };

        transitHubFactory.getAll = () => {
            return $http.get('/api/transithub');
        };

        transitHubFactory.create = (thData) => {
            return $http.post('/api/transithub', lsData)
        };

        transitHubFactory.update =  (thData) => {
            return $http.put('/api/transithub/' + thData._id, thData);
        };

        transitHubFactory.delete = (thId) => {
            return $http.delete('/api/transithub/' + thId);
        };

        return transitHubFactory;
    });