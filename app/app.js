(function() {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Custom events:
 - 'what-can-sow-update' - lets the componenents know a user has updated the sow info
 - {what-can-sow-update : true  } - data format

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    'use strict';

    angular.module("gardeningHipster", [
            'ui.router',
            'gardeningHipster.header',
            'gardeningHipster.footer',
            'gardeningHipster.home',
            'gardeningHipster.plants',
            'gardeningHipster.buySeeds',
            'gardeningHipster.whatCanISowFull',
            'gardeningHipster.universal-loader',
            'gardeningHipster.loaderService',
            'gardeningHipster.articles',
            'gardeningHipster.navver'

        ])

    .run(appRun)
        .controller('appCtrl', appCtrl)
        .config(appConfig);

    appConfig.$injector = ['ui.router'];
    appCtrl.$injector = ['gardeningHipster.loaderService'];

    function appRun() {

    }

    function appCtrl($scope, $window, $location, loaderService) {
        var vm = this;
        vm.loaderdata = {
            loaderName: "mainLoader",
            autoShow: true
        };

        // set up on route change loader handler
        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (secondRun) {
                loaderService.show('mainLoader');
            }
        });

        $scope.$on('$stateChangeSuccess', function(event, toState, data, toParams, fromState, fromParams) {
            // send page views to anayltics on state success change
            if ($window.ga) {
                $window.ga('send', 'pageview', { page: $location.$$url });
            }
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = 'Gardening Hipster | ' + toState.data.pageTitle;
                $scope.pageDescription = toState.data.pageDescription;
            }
        });

        var secondRun = true;

    }
    function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }

})();