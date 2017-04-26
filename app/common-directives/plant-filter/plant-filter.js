(function() {

    'use strict';

    angular.module('gardeningHipster.plantFilter', [
        'gardeningHipster.utils'
        ])
        .directive('plantFilter', plantFilter);

    function plantFilter($rootScope, $window) {

        var directive = {
            link: link,
            controller: plantFilterCntrl,
            scope : {
                inputTitle : "@",
                search : "="
            },
            templateUrl: 'app/common-directives/plant-filter/plant-filter.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

        }

        plantFilterCntrl.$injector = ['$scope'];

        function plantFilterCntrl($scope) {
            

        }

    }

})();