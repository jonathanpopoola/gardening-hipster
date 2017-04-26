(function() {
    
    'use strict';
    
    angular.module('gardeningHipster.plantsApi', ['gardeningHipster.utils'])
        .factory('plantsApi', plantsApi);

    plantsApi.$injector = ['$http', '$location', 'gardeningHipster.utils'];

    function plantsApi($http, $location, utilsFactory) {

        var service = {};
        service.monthIDs = {
            1020 : 'january',
            1021 : 'february',
            1022 : 'march',
            1023 : 'april',
            1024 : 'may',
            1025 : 'june',
            1026 : 'july',
            1027 : 'august',
            1028 : 'september',
            1029 : 'october',
            1030 : 'november',
            1031 : 'december'
        }
        
        service.whatMonths = function(list) {
            var newList = [];
            for(var x=0; x < list.length; x++) {
              var pos = list[x];
              newList.push(service.monthIDs[pos]);
            }
            return newList;
        }
        
        service.cacheMonthIDs = function() {
            return service.monthIDs;
        }
        
        service.plantsCache;
        service.plantInfoCache;
        service.allPlantsCache;
        
        // defaults for what can i sow widgets
        service.whatCanISow = {type: 'flower', month: utilsFactory.currentMonth()};
        // privilaged method
        service.setWhatCanBeSowed = function(type, month) {
            service.whatCanISow.type = type;
            service.whatCanISow.month = month;
        };
        
        service.getGardeningNews = function() {
            return $http.get('server/api/get-gardening-news')
                .then(function(response) {
                    //service.plantsCache = filterResults(response);
                    return response;
                })
                .catch(fail);
        }
        
        service.getAllPlants = function(args) {
            return $http.post('server/api/get-all-plants', args)
                .then(function(response) {
                    service.allPlantsCache = filterResults(response);
                    return response; 
                })
                .catch(fail);
        }
        
        service.getSowData = function(mode) {
            var args = service.whatCanISow;
            args.mode = mode;
            return $http.post('server/api/what-can-i-sow', args)
                .then(function(response) {
                    service.plantsCache = filterResults(response);
                    return response;
                })
                .catch(fail);
        }
        service.currentPage = 1;
        
        service.getPlantInfo = function(args) {
            return $http.post('server/api/get-plants', args)
                .then(function(response) {
                    service.plantInfoCache = filterResults(response);
                })
                .catch(fail);
        }
        
        service.allPlantsCache = function() {
            return service.allPlantsCache;
        }
        
        service.returnSowData = function() {
            return service.plantsCache;
        }
        
        service.returnPlantInfo = function() {
            return service.plantInfoCache;
        }
        
        function filterResults (incomingData) {
            var outgoingData = [];
            for(var x = 0; x < incomingData.data.result.length; x++) {
                var sortedResult = incomingData.data.result[x].data;
                sortedResult.template = incomingData.data.result[x].template;
                sortedResult.months_sow = service.whatMonths(sortedResult.months_sow);
                sortedResult.months_flower = service.whatMonths(sortedResult.months_flower);
                outgoingData.push(sortedResult);
            }
            return outgoingData;
        }
        
        function success(response) {
            return response.data;
        }

        function fail(e) {
            return {
                message: 'Request failed ',
                error: e
            };
        }

        var publicApi = {
            getSowData: service.getSowData,
            setWhatCanBeSowed : service.setWhatCanBeSowed,
            whatCanISow : service.whatCanISow,
            plantsCache : service.returnSowData,
            getPlantInfo : service.getPlantInfo,
            plantInfo : service.returnPlantInfo,
            months : service.whatMonths,
            getGardeningNews : service.getGardeningNews,
            allPlantsCache : service.allPlantsCache,
            getAllPlants : service.getAllPlants
            
        }

        return publicApi;

    }

})();