(function() {
  'use strict';

  angular.module('gardeningHipster.buySeeds', [
      'gardeningHipster.tdFactory',
      'gardeningHipster.whatCanISow',
      'gardeningHipster.tdFactory',
      'gardeningHipster.dealsApi',
      'gardeningHipster.pager',
      'gardeningHipster.pagerFilter',
      'gardeningHipster.dealElementMini',
      'gardeningHipster.searchApi',
      'gardeningHipster.loaderService',
      'gardeningHipster.universal-loader'
    ])
    .config(routeMain);

  routeMain.$injector = ['ui.router'];
  startUpdata.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.utils', 'gardeningHipster.dealsApi', 'gardeningHipster.searchApi', 'gardeningHipster.loaderService'];
  // example route with parameters = https://gardening-hipster-jonnyhitek.c9.io/#/buy-seeds/?seedtype=flower&pagenumber=3
  function routeMain($stateProvider) {
    $stateProvider.state('buySeeds', {
      url: '/buy-seeds-and-plants/:dealId',
      params: {
        dealId: {
          value: null,
          squash: true
        }
      },
      views: {
        "main": {
          controller: BuySeedsCtrl,
          controllerAs: 'seeds',
          templateUrl: function($stateParams) {
            if ($stateParams.dealId) {
              return 'app/buy-seeds/deal.tpl.html';
            }
            else {
              return 'app/buy-seeds/buy-seeds.tpl.html';
            }
          },
          resolve: {
            startUpdata: startUpdata
          }
        }
      },
      data: {
        pageTitle: 'Buy Plants, Seeds and more',
        pageDescription: 'Find great deals for Plants, Flowers and more.'
      }
    });
  }

  function BuySeedsCtrl(startUpdata, $stateParams, $timeout, dealsApi, searchApi, $scope, loaderService) {
    var vm = this;
    vm.loaderdata = {
      loaderName: "lazyLoader",
      autoShow: false
    };
    if (!$stateParams.dealId) {
      vm.deals = dealsApi.returnPagedDeals();
    }
    else {
      if (searchApi.returnSearchCriteria()) {
        if (searchApi.returnSearchCriteria().searchTerm) {
          var matcherTerm = searchApi.returnSearchCriteria().searchTerm;
        }
      }
      else {
        var temp = dealsApi.returnDealCache()[0].product_name.split(" ");
        var matcherTerm = temp[0];
      }

      dealsApi.dealMatcher(matcherTerm).then(function() {
        vm.matchingDeals = dealsApi.returnMatchedDeals();
      });
      vm.deal = dealsApi.returnDealCache();
    }

    $scope.$on('load-instructer', loadInstructer);
    
    function loadInstructer(ignore, config) {
      loaderService.show("lazyLoader");
      if (config.type === 'lazy-load') {
        dealsApi.increasePageNumber();
      }
      else if (config.type === 'filter-change') {
        dealsApi.resetPageNumber();
        dealsApi.filterSetter({
          merchant_category: config.merchant_category
        });
      }
      dealsApi.getPagedDeals().then(function() {
        vm.deals = dealsApi.returnPagedDeals();
        loaderService.hide("lazyLoader");
      });

    }
    
    $timeout(function() {
      loaderService.hide('mainLoader');
    }, 500);
    
    
    $scope.$on('$destroy', function () {
             console.info("destroyed");
            });

    

  }

  function startUpdata($rootScope, $q, tdFactory, utilsFactory, dealsApi, $stateParams) {
    var deferred = $q.defer(),
      data = null;

    //return function() {
    if ($stateParams.dealId) {
      return dealsApi.getDeal({
        'dealId': $stateParams.dealId
      }).then(function() {
        deferred.resolve();
      });
    }
    else {
      return dealsApi.getPagedDeals({
        'pageNumber': dealsApi.getCurrentPage()
      }).then(function() {
        deferred.resolve();
      });
    }
    //}
    return deferred.promise;

  }

})();