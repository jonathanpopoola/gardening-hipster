(function() {
  'use strict';

  angular.module('gardeningHipster.whatCanISowFull', [
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISow',
      'gardeningHipster.plantsApi',
      'gardeningHipster.whatCanISowFullList',
      'gardeningHipster.loaderService'
    ])
    .config(routeMain);

  routeMain.$injector = ['ui.router'];
  startUpdata.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.utils', 'gardeningHipster.plantsApi', 'gardeningHipster.loaderService'];

  function routeMain($stateProvider) {
    $stateProvider.state('whatCanIPlant', {
      url: '/what-can-i-plant',
      views: {
        "main": {
          controller: WhatCanISowFull,
          controllerAs: 'plantinfo',
          templateUrl: 'app/what-can-i-sow-full/what-can-i-sow-full.tpl.html',
          resolve: {
            startUpdata: startUpdata
          }
        }
      },
      data: {
        pageTitle: 'What can I plant'
      }
    });
  }

  function WhatCanISowFull(plantsApi, loaderService, $timeout) {
    var vm = this;
    $timeout(function() {
      loaderService.hide('mainLoader');
    }, 1000);
  }

  function startUpdata($rootScope, $stateParams, tdFactory, utilsFactory, plantsApi) {
    plantsApi.getSowData().then(function(data) {
      $rootScope.$broadcast('what-can-sow-update');
    });
  }

})();