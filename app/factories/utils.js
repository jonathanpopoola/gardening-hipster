(function() {
    'use strict';
    angular
        .module('gardeningHipster.utils', [])
        .factory('utilsFactory', utilsFactory);
    utilsFactory.$injector = ['$http', '$location'];

    function utilsFactory($http, $location) {
        var service = {};
        // list of month array
        service.month = ["january", "february", "march", "april", "may","june","july","august","september","october","november", "december"];
        
        // return current month in text form
        service.currentMonth = function() {
            var d = new Date();
            return service.month[d.getMonth()];
        };
        
        // return public api 
        var publicObj = {
            currentMonth: service.currentMonth
        };

        return publicObj;

    };
})();