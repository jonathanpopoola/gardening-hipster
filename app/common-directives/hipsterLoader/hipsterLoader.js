(function() {

    'use strict';

    angular.module('gardeningHipster.hipsterLoader', ['gardeningHipster.loaderService'])
        .directive('hipsterLoader', hipsterLoader);

    function hipsterLoader() {

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'loader',
            //transclude: true,
            scope: {
                loaderName: '=',
                show: '='
            },
            templateUrl: 'app/common-directives/hipsterLoader/hipsterLoader.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            
        }

        //dirCntrl.$injector = [];
        function dirCntrl(loaderService, $scope) {
            var vm = this;
   

        }

    }

})();