angular.module('localEmpServices', [])

    .factory('LocalStoreEmp', function ($http) {
        let localStoreEmpFactory = {};

        localStoreEmpFactory.getAll = () => {
            return $http.get('/api/localstoreEmp');
        };

        localStoreEmpFactory.create = (lsEmpData) => {
            return $http.post('/api/localstoreEmp', lsEmpData)
        };

        localStoreEmpFactory.update =  (lsEmpData) => {
            return $http.put('/api/localstoreEmp/' + lsEmpData._id, lsEmpData);
        };

        localStoreEmpFactory.delete = (lsEmpId) => {
            return $http.delete('/api/localstoreEmp/' + lsEmpId);
        };

        return localStoreEmpFactory;
    });