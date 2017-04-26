(function() {

    'use strict';

    angular.module('gardeningHipster.whatCanISow', ['gardeningHipster.utils', 'gardeningHipster.plantsApi'])
        .directive('whatCanISow', whatCanISow);

    function whatCanISow() {

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'sow',
            scope: {
                'title': '@'
            },
            templateUrl: 'app/common-directives/what-can-i-sow/what-can-i-sow.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

        }

        dirCntrl.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.plantsApi'];

        function dirCntrl($rootScope, utilsFactory, plantsApi) {
            var vm = this;

            vm.currentMonth = function() {
                return utilsFactory.currentMonth();
            };

            vm.type = plantsApi.whatCanISow.type;
            vm.month = plantsApi.whatCanISow.month;

            vm.findOut = function() {
                plantsApi.setWhatCanBeSowed(vm.type, vm.month);
                plantsApi.getSowData().then(function(data) {
                  
                  $rootScope.$broadcast('what-can-sow-update');
                });
            }

        }

    }

})();