(function() {

    'use strict';

    angular.module('gardeningHipster.dealsApi', ['gardeningHipster.utils'])
        .factory('dealsApi', dealsApi);

    dealsApi.$injector = ['$http', '$location', 'gardeningHipster.utils'];

    function dealsApi($http, $location, utilsFactory) {

        var service = {};

        service.dealsCache;
        service.pagedDealsCache = null;
        service.dealMatcherCache;
        service.dealCache;
        service.page = 1;
        service.selectedFilters;

        // private categories

        var categories = {
            merchant_category: [{
                value: 'Bedding Plants',
                checked: false
            }, {
                value: 'Perennials',
                checked: false
            }, {
                value: 'Vegetable Plants',
                checked: false
            }, {
                value: 'Shrubs',
                checked: false
            }, {
                value: 'Bulbs, Tubers & Corms',
                checked: false
            }, {
                value: 'Soft Fruit Plants',
                checked: false
            }, {
                value: 'Roses',
                checked: false
            }, {
                value: 'Vegetable seeds',
                checked: false
            }]
        }

        service.filterSetter = function(filterObject) {
            service.selectedFilters = filterObject;
            // reset page number here to, as fresh filters require fresh paging
            service.page = 1;
            service.pagedDealsCache = null;
            service.getPagedDeals();
        }

        service.increasePageNumber = function() {
            service.page = service.page + 1;
            return;
        }

        service.resetPageNumber = function() {
            console.info("page number reset");
            service.page = 1;
            return;
        }

        service.getAllDeals = function() {
            return $http.post('server/api/get-plant-deals')
                .then(function(response) {
                    service.dealCache = filterResults(response);
                })
                .catch(fail);
        }
        
        /*var deferred = $q.defer();

        $http({
          method: 'POST',
          url: '/api/assets/add',
          data: $.param(args)
        }).
        success(function(data, status) {
          deferred.resolve(data);
        }).
        error(function(data, status) {
          deferred.reject(data);
        });

        return deferred.promise;*/
        
        service.getDeal = function(args) {
            return $http.post('server/api/deal', args)
                .then(function(response) {
                    service.dealCache = filterResults(response);
                })
                .catch(fail);
        }

        service.getPagedDeals = function() {
            var args = {
                'pageNumber': service.page
            };
            if (service.selectedFilters) {
                args.selectedFilters = service.selectedFilters;
            }
            return $http.post('server/api/deal-pager', args)
                .then(function(response) {
                    var filteredData = filterResults(response);
                    if (filteredData) {
                        if (!service.pagedDealsCache) {

                            service.pagedDealsCache = filteredData;
                        }
                        else {
                            var temp = service.pagedDealsCache.concat(filteredData);
                            service.pagedDealsCache = temp;
                        }
                    }
                    else {
                        console.warn("no more data");
                    }
                })
                .catch(fail);
        }

        service.returnCategories = function() {
            return categories;
        }

        service.returnPagedDeals = function() {
            return service.pagedDealsCache;
        }

        service.getCurrentPage = function() {
            return service.page;
        }
        
        service.returnDealCache = function() {
            return service.dealCache;
        }


        service.dealMatcher = function(searchTerm) {
            return $http.post('server/api/deal-matcher', {
                    'searchTerm': searchTerm
                })
                .then(function(response) {
                    service.dealMatcherCache = filterResults(response);
                    service.page = service.page + 1;
                })
                .catch(fail);
        }

        service.returnMatchedDeals = function() {
            return service.dealMatcherCache;
        }

        service.returnDeals = function() {
            return service.dealCache;
        }

        function filterResults(incomingData) {
            if (incomingData.data.result.length > 0) {
                var outgoingData = [];
                for (var x = 0; x < incomingData.data.result.length; x++) {
                    var sortedResult = incomingData.data.result[x].data;
                    outgoingData.push(sortedResult);
                }

            }
            else {
                console.warn("end of results");
                outgoingData = null;
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
            getAllDeals: service.getAllDeals,
            returnDeals: service.returnDeals,
            dealMatcher: service.dealMatcher,
            returnMatchedDeals: service.returnMatchedDeals,
            returnPagedDeals: service.returnPagedDeals,
            getPagedDeals: service.getPagedDeals,
            getCurrentPage: service.getCurrentPage,
            returnCategories: service.returnCategories,
            filterSetter: service.filterSetter,
            increasePageNumber: service.increasePageNumber,
            resetPageNumber: service.resetPageNumber,
            returnDealCache : service.returnDealCache,
            getDeal: service.getDeal
        }

        return publicApi;

    }

})();