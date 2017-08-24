angular.module('localStoreServices', [])

    .factory('LocalStore', function ($http) {
        let localStoreFactory = {};

        localStoreFactory.getAll = () => {
            return $http.get('/api/localStore');
        };

        localStoreFactory.create = (lsData) => {
            return $http.post('/api/localStore', lsData)
        };

        localStoreFactory.update =  (lsData) => {
            return $http.put('/api/localStore' + lsData.id, lsData);
        };

        localStoreFactory.delete = (lsId) => {
            return $http.delete('/api/localStore' + lsId);
        };

        return localStoreFactory;
    });