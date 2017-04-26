(function() {
    
    'use strict';
    
    angular.module('gardeningHipster.newsApi', ['gardeningHipster.utils'])
        .factory('newsApi', newsApi);

    newsApi.$injector = ['$http', '$location', 'gardeningHipster.utils'];

    function newsApi($http, $location, utilsFactory) {

        var service = {};
        
        service.newsCache = [];
        service.articleCache = [];
        service.currentPage = 1;

        
        // defaults for what can i sow widgets
        
        // privilaged method
        service.getNews = function() {
            return service.newsCache;
        };
        
        service.returnArticle = function() {
            return service.articleCache;
        }
        
        service.getArticle = function(args) {
            return $http.post('server/api/get-article', args)
                .then(function(response) {
                    service.articleCache = filterResults(response);
                    return response; 
                })
                .catch(fail);
        }
        
        service.getAllArticles = function(limit) {
            return $http.post('server/api/articles', limit)
                .then(function(response) {
                    service.newsCache = [];
                    service.newsCache = filterResults(response);
                    return response; 
                })
                .catch(fail);
        }

        function filterResults (incomingData) {

            if (incomingData.data.result.length > 0) {
                var outgoingData = [];
                for (var x = 0; x < incomingData.data.result.length; x++) {
                    var sortedResult = incomingData.data.result[x].data;
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
            getNews: service.getNews,
            getAllArticles : service.getAllArticles,
            getArticle : service.getArticle,
            returnArticle : service.returnArticle
            
        }

        return publicApi;

    }

})();