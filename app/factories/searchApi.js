(function() {

    'use strict';

    angular.module('gardeningHipster.searchApi', ['gardeningHipster.utils'])
        .factory('searchApi', searchApi);

    searchApi.$injector = ['$http', '$location', 'gardeningHipster.utils'];

    function searchApi($http, $timeout, $location, utilsFactory) {

        var service = {};

        service.searchCache = null;
        service.searchCriteria = null;


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

        service.resetPageNumber = function() {
            service.page = 1;
            return;
        }

        service.getSearchResults = function(args) {
            service.searchCriteria = args;
            return $http.post('server/api/search', args)
                .then(function(response) {
                    var filteredData = filterResults(response);
                        if (filteredData) {
                            service.searchCache = filteredData;
                        }
                        else {
                            console.warn("no more data");
                        }
                })
                .catch(fail);
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

        service.searchCache = function() {
            return service.searchCache;
        }
        
        service.returnSearchCriteria = function() {
            return service.searchCriteria;
        }

        service.returnDeals = function() {
            return service.dealsCache;
        }

        function filterResults(incomingData) {
            if (incomingData.data.result.length > 0) {
                var outgoingData = [];
                for (var x = 0; x < incomingData.data.result.length; x++) {
                    var sortedResult = incomingData.data.result[x].data;
                    sortedResult.template = incomingData.data.result[x].template;
                    outgoingData.push(sortedResult);
                }

            }
            else {
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
            getSearchResults: service.getSearchResults,
            searchCache: service.searchCache,
            returnSearchCriteria: service.returnSearchCriteria
        }

        return publicApi;

    }

})();