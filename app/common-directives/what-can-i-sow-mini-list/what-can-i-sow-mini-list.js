(function() {

    'use strict';

    angular.module('gardeningHipster.whatCanISowMiniList', ['gardeningHipster.utils', 'gardeningHipster.plantsApi'])
        .directive('whatCanISowMiniList', whatCanISowMiniList);

    function whatCanISowMiniList() {
        dirCntrl.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.plantsApi'];
        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'sowMiniList',
            scope: {
                'title': '@'
            },
            templateUrl: 'app/common-directives/what-can-i-sow-mini-list/what-can-i-sow-mini-list.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

        }

        function dirCntrl($scope, $timeout, utilsFactory, plantsApi) {
            var vm = this;

            function updateList() {
                $timeout(function() {
                    vm.type = plantsApi.whatCanISow.type;
                    vm.month = plantsApi.whatCanISow.month;
                    vm.plants = plantsApi.plantsCache();
                }, 500);
                
            }

            updateList();
            // listen for changes
            $scope.$on('what-can-sow-update', updateList);
        }

    }

})();