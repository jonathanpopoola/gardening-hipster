(function() {
  'use strict';

  angular.module('gardeningHipster.articles', [
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISow',
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISowMiniList',
      'gardeningHipster.dealElementMini',
      'gardeningHipster.loaderService',
      'gardeningHipster.newsApi'
    ])
    .config(routeMain);

  routeMain.$injector = ['ui.router'];
  startUpdata.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.utils', 'gardeningHipster.plantsApi', 'gardeningHipster.dealsApi', 'gardeningHipster.newsApi'];

  function routeMain($stateProvider) {
    $stateProvider.state('articles', {
      url: '/articles/:name',
      params: {
        name: {
          value: null,
          squash: true
        }
      },
      views: {
        "main": {
          controller: ArticlesCtrl,
          controllerAs: 'articles',
          templateUrl: function($stateParams) {
            if ($stateParams.name) {
              return 'app/articles/article.tpl.html';
            }
            else {
              return 'app/articles/articles.tpl.html';
            }
          },
          resolve: {
            startUpdata: startUpdata
          }
        }
      },
      data: {
        pageTitle: 'Gardening news and insight',
        pageDescription: 'Find great deals for Plants, Flowers and more.'
      }

    });
  }

  function ArticlesCtrl($timeout, $stateParams, loaderService, newsApi, dealsApi) {
    var vm = this;
    $timeout(function() {
      loaderService.hide('mainLoader');
    }, 500);
    
    if ($stateParams.name) {
      var art = newsApi.returnArticle();
      vm.article = art[0];
      if(vm.article.Keywords) {
        if(vm.article.Keywords.indexOf(",") === -1) {
          dealsApi.dealMatcher(vm.article.Keywords).then(function() {
            vm.deals = dealsApi.returnMatchedDeals();
          });
        }else {
          var searchTerms = vm.article.Keywords.split(',');
          dealsApi.dealMatcher(searchTerms[0]).then(function() {
            vm.deals = dealsApi.returnMatchedDeals();
          });
        }
      }
    }else if (!$stateParams.name) {
      vm.articles = newsApi.getNews();
      vm.search = {};
      vm.search.title = "";
    }
  }

  function startUpdata($rootScope, $q, $stateParams, tdFactory, utilsFactory, plantsApi, newsApi) {
    var deferred = $q.defer();
    var args = {};
    if ($stateParams.name) {
      args.title = $stateParams.name;
      newsApi.getArticle(args).then(function() {
        deferred.resolve();
      });
    } else {
      newsApi.getAllArticles().then(function() { // need to add filtering by types
        deferred.resolve();
      });
    }
     return deferred.promise;
  }

})();