(function() {

    'use strict';

    angular.module('gardeningHipster.universal-loader', ['gardeningHipster.loaderService'])
        .directive('universalLoader', universalLoader);

    function universalLoader() { 

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'uniLoader',
            scope: {
                'loaderdata': '='
            },
            templateUrl: 'app/common-directives/universal-loader/universal-loader.tpl.html',
            restrict: 'A',
            bindToController: false,
            replace: true,
            transclude: true
        };
        return directive;

        function link(scope, element, attrs) {

        }

        function dirCntrl($scope, loaderService) {
            var vm = this;
            vm.show = $scope.loaderdata.autoShow;
            vm.api = {
                loaderName : $scope.loaderdata.loaderName,
                show: function () {
                  vm.show = true;
                 },
                 hide: function () {
                    vm.show = false;
                 }
            }
            loaderService.register(vm.api);
        }

    }

})();