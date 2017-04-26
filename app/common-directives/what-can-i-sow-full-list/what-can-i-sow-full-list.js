(function() {

    'use strict';

    angular.module('gardeningHipster.whatCanISowFullList', ['gardeningHipster.utils', 'gardeningHipster.plantsApi'])
        .directive('whatCanISowFullList', whatCanISowFullList);

    function whatCanISowFullList() {
        dirCntrl.$injector = ['gardeningHipster.tdFactory', 'gardeningHipster.plantsApi'];
        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'sowFullList',
            scope: {
                'title': '@'
            },
            templateUrl: 'app/common-directives/what-can-i-sow-full-list/what-can-i-sow-full-list.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

        }

        function dirCntrl($scope, utilsFactory, plantsApi) {
            var vm = this;

            function updateList() {
           
                    vm.type = plantsApi.whatCanISow.type;
                    vm.month = plantsApi.whatCanISow.month;
                    vm.plants = plantsApi.plantsCache();
               
                
            }

            updateList();
            // listen for changes
            $scope.$on('what-can-sow-update', updateList);
        }

    }

})();