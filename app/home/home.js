(function() {
  'use strict';

  angular.module('gardeningHipster.home', [
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISow',
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISowMiniList',
      'gardeningHipster.plantsApi',
      'gardeningHipster.dealsApi',
      'gardeningHipster.newsApi',
      'gardeningHipster.newsElement',
      'gardeningHipster.dealElementMini',
      'gardeningHipster.loaderService'
    ])
    .config(routeMain);

  routeMain.$injector = ['ui.router'];
  startUpdata.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.utils', 'gardeningHipster.plantsApi', 'gardeningHipster.loaderService'];

  function routeMain($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        "main": {
          controller: HomeCtrl,
          controllerAs: 'home',
          templateUrl: 'app/home/home.tpl.html',
          resolve: {
            startUpdata: startUpdata
          }
        }
      },
      data: {
        pageTitle: 'Home',
        pageDescription: 'Welcome to the Gardening Hipster'

      }
    });
  }

  function HomeCtrl(startUpdata, $timeout, utilsFactory, dealsApi, newsApi, loaderService, plantsApi) {
    var vm = this;
    vm.articles = newsApi.getNews();
    vm.deals = dealsApi.returnDeals();
    vm.plants = plantsApi.allPlantsCache();
    vm.currentMonth = utilsFactory.currentMonth();
    $timeout(function() {
      loaderService.hide('mainLoader');
    }, 300);
  }

  function startUpdata($rootScope, $q, tdFactory, utilsFactory, plantsApi, newsApi, dealsApi) {
    var deferred = $q.defer();
    plantsApi.getSowData('mini').then(function(data) {
      $rootScope.$broadcast('what-can-sow-update');
    });

    var args = {
      limit: 3
    };

    newsApi.getAllArticles(args).then(function() {
      plantsApi.getAllPlants(args).then(function() { // need to add filtering by types
        dealsApi.getAllDeals().then(function() {
          deferred.resolve();
        });
      });
    });

    return deferred.promise;
  }

})();