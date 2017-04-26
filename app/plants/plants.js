(function() {
  'use strict';

  angular.module('gardeningHipster.plants', [
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISow',
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISowMiniList',
      'gardeningHipster.plantsApi',
      'gardeningHipster.dealsApi',
      'gardeningHipster.dealElementMini',
      'gardeningHipster.loaderService',
      'gardeningHipster.plantFilter'
    ])
    .config(routeMain);

  routeMain.$injector = ['ui.router'];
  startUpdata.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.utils', 'gardeningHipster.plantsApi', 'gardeningHipster.dealsApi'];

  function routeMain($stateProvider) {
    $stateProvider.state('plants', {
      url: '/plants/:type/:name',
      params: {
        type: {
          value: null,
          squash: true
        },
        name: {
          value: null,
          squash: true
        }
      },
      views: {
        "main": {
          controller: PlantsCtrl,
          controllerAs: 'plantinfo',
          templateUrl: function($stateParams) {
            if (!$stateParams.type && !$stateParams.name) {
              return 'app/plants/plants.tpl.html';
            }
            else if ($stateParams.type && !$stateParams.name) {
              return 'app/plants/plants.tpl.html';
            }
            else if ($stateParams.type && $stateParams.name) {
              return 'app/plants/plant.tpl.html';
            }
          },
          resolve: {
            startUpdata: startUpdata
          }
        }
      },
      data: {
        pageTitle: 'Find Plants',
        pageDescription: 'Find great deals for Plants, Flowers and more.'
      }

    });
  }

  function PlantsCtrl($timeout, $stateParams, plantsApi, dealsApi, loaderService) {
    var vm = this;
    $timeout(function() {
      loaderService.hide('mainLoader');
    }, 500);
    vm.categories = dealsApi.returnCategories();
    if ($stateParams.name) {
      var plantList = plantsApi.plantInfo();
      vm.plant = plantList[0];
      dealsApi.dealMatcher($stateParams.name).then(function() {
        vm.plantDeals = dealsApi.returnMatchedDeals();
      });
    }
    if ($stateParams.type) {
      vm.typeOfPlant = $stateParams.type;
    }
    if (!$stateParams.name) {
      vm.plants = plantsApi.allPlantsCache();
      vm.search = {};
      vm.search.title = "";
    }

  }

  function startUpdata($rootScope, $q, $stateParams, tdFactory, utilsFactory, plantsApi) {
    var deferred = $q.defer();
    var args = {};
    if ($stateParams.name) {
      args.name = $stateParams.name;
      plantsApi.getPlantInfo(args).then(function() {
        deferred.resolve();
      });
    }
    else {
      plantsApi.getAllPlants().then(function() { // need to add filtering by types
        deferred.resolve();
      });
    }
    return deferred.promise;
  }

})();