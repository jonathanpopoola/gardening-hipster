(function() {
    'use strict';
    angular
        .module('gardeningHipster.tdFactory', [])
        .factory('tdFactory', tdFactory); 
    tdFactory.$injector = ['$http', '$location'];

    function tdFactory($http, $location) {
        var service = {};
        service.TOKEN = 'EDE62D8EFE6C0678C795E2B733FBA5A80C1EE306'; 
        service.homeInitData = function() {
            
            return $http.get('https://api.tradedoubler.com/1.0/productFeeds?token='+this.TOKEN+'?callback=JSON_CALLBACK')
            .then(success)
            .catch(fail);
            
            function success (response) {
                return response.data;
            }
            
            function fail (e) {
                return {message : 'Request failed ', error : e};
            }
                    
        };
        
        // return public api 
        var publicObj = {
            TOKEN : service.TOKEN,
            homeInitData : service.homeInitData // privilaged method
            }; 
            
        return publicObj;

    };
})();