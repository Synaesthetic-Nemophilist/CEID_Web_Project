angular.module('packageServices', [])

    .factory('Package', function ($http) {
        let packageFactory = {};

        packageFactory.getAll = () => {
            return $http.get('/api/package');
        };

        packageFactory.create = (packageData) => {
            return $http.post('/api/package', packageData)
        };

        packageFactory.update =  (packageData) => {
            return $http.put('/api/package/' + packageData._id, packageData);
        };

        packageFactory.delete = (packageDataId) => {
            return $http.delete('/api/package/' + packageDataId);
        };

        packageFactory.getByTn = (tn) => {
            return $http.get('/api/package/' + tn);
        };

        return packageFactory;
    });