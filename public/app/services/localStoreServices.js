angular.module('localStoreServices', [])

    .factory('LocalStore', function ($http) {
        let localStoreFactory = {};

        localStoreFactory.getPathCoords = (fullPath) => {
            return $http.post('/api/network/path', fullPath);
        };

        localStoreFactory.getAll = () => {
            return $http.get('/api/localstore');
        };

        localStoreFactory.getById = (id) => {
            return $http.get('/api/localstore/' + id);
        };

        localStoreFactory.getByPcode = (pcode) => {
            return $http.get('/api/localstore/pcode/' + pcode);
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
    })


    .factory('SearchNCache', function ($http, $cacheFactory) {
        let searchCacheFactory = {};

        searchCacheFactory.getCity = (payload, successCallback) => {
            let key = 'search_' + payload.q;  //create key for checking cache

            // if city name not stored in cache, then do the API call
            if($cacheFactory.get(key) === undefined || $cacheFactory.get(key) === ''){
                $http.get('/api/localstore/search/' + payload.q)
                    .then(function(data){
                        $cacheFactory(key).put('result', data.data);
                        successCallback(data.data);
                    });
            }else{
                successCallback($cacheFactory.get(key).get('result'));
            }
        };

        return searchCacheFactory;
    });