var app = angular.module('wooshop.services', [])

app.service('wooshopService', function($http, $q, SETTINGS){
    
    this.getCategories =  function() {
        var deferred = $q.defer();
        var data = [];

        // API request to Fetch all categories

        $http({
            method: 'GET',
            url: SETTINGS.base_url + '/API.php',
            params: {
                getCategory: 'all'
            }
        })

        .then(function(data){
            data = data.data['product_categories'];
            window.localStorage.setItem("categories", JSON.stringify(data));
            deferred.resolve(data);
        },
        function(data) {
            if(window.localStorage.getItem("categories") !== undefined) {
                data = JSON.parse(window.localStorage.getItem("categories"));
            }
            deferred.resolve(data);
        })
        
        return deferred.promise;
    }
    
    this.getItems =  function() {
    
        // API request to  Fetch all Products

        var deferred = $q.defer();
        var data = [];

        $http({
            method: 'GET',
            url: SETTINGS.base_url + '/API.php',
            params: {
                getItems: 'all'
            }
        })

        .then(function(data){
            data = data.data['products'];
            window.localStorage.setItem("products", JSON.stringify(data));
            deferred.resolve(data);
        },
        function(data) {
            if(window.localStorage.getItem("products") !== undefined) {
                data = JSON.parse(window.localStorage.getItem("products"));
            }
            deferred.resolve(data);
        })

        return deferred.promise;
    }
    
    // API request to  Fetch all Category Products
    
    this.getCatItems =  function(getCatSlug) {

        var deferred = $q.defer();
        var data = [];

        $http({
            method: 'GET',
            url: SETTINGS.base_url + '/API.php/',
            params: {
                getCatSlug: getCatSlug
            }
        })

        .then(function(data){
            data = data.data['products'];
            deferred.resolve(data);
        })

        return deferred.promise;
    }
    
    // API request to  Fetch Single Product
    
    this.getItem =  function(productId) {
        var deferred = $q.defer();
        var data = [];
        
        $http({
            method: 'GET',
            url: SETTINGS.base_url + '/API.php/',
            params: {
                productId: productId
            }
        })
        .then(function(data){
             data = data.data['product'];
            deferred.resolve(data);
        })

        return deferred.promise;
    }
    
    // API request to  Fetch Store Parameters
    
    this.getIndex =  function() {
        var deferred = $q.defer();
        var data = [];
        
        $http({
            method: 'GET',
            url: SETTINGS.base_url + '/API.php/',
            params: {
                getIndex: 'all'
            }
        })
        .then(function(data){
             data = data.data['store']['meta'];
            
            deferred.resolve(data);
        })

        return deferred.promise;
    }
})

