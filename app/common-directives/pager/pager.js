(function() {

    'use strict';

    angular.module('gardeningHipster.pager', ['gardeningHipster.utils', 'gardeningHipster.dealElementMini'])
        .directive('pager', pager);

    function pager($rootScope, $window) {
        var directive = {
            link: link,
            controller: pagerCntrl,
            controllerAs: 'pagee',
            scope: {
                'pagingelements': '='
            },
            templateUrl: 'app/common-directives/pager/pager.tpl.html',
            restrict: 'A',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                scope.checkScroll();
            })
        }

        pagerCntrl.$injector = ['$scope', '$interval', '$window', '$document'];

        function pagerCntrl($scope, $interval, $window, $document, $rootScope) {
            var vm = this;

            vm.didScroll = false;

            vm.lazyTrigger = 80;
            vm.pagerLoader = false;

            $scope.checkScroll = function() {
                vm.didScroll = true;
            }

            $interval(function() {
                var top = $window.pageYOffset,
                    wHeight = $window.innerHeight,
                    dHeight = $document[0].body.clientHeight;
                if (vm.didScroll) {
                    vm.didScroll = false;
                    if (top + wHeight > dHeight - vm.lazyTrigger) {
                        $rootScope.$broadcast('load-instructer', {type : 'lazy-load'});
                    }
                }
            }, 500);
            
            
            $scope.$on('$destroy', function () {
              $interval.cancel();
            });

        }

    }

})();