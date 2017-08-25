angular.module('localStoreServices', [])

    .factory('LocalStore', function ($http) {
        let localStoreFactory = {};

        localStoreFactory.getAll = () => {
            return $http.get('/api/localstore');
        };

        localStoreFactory.create = (lsData) => {
            return $http.post('/api/localstore', lsData)
        };

        localStoreFactory.update =  (lsData) => {
            return $http.put('/api/localstore/' + lsData._id, lsData);
        };

        localStoreFactory.delete = (lsId) => {
            return $http.delete('/api/localstore/' + lsId);
        };

        return localStoreFactory;
    });