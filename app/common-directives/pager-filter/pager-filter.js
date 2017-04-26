(function() {

    'use strict';

    angular.module('gardeningHipster.pagerFilter', ['gardeningHipster.utils', 'gardeningHipster.dealsApi'])
        .directive('pagerFilter', pagerFilter);

    function pagerFilter($rootScope, $window, $timeout) {

        var directive = {
            link: link,
            controller: pagerFilterCntrl,
            controllerAs: 'pageFilter',
            templateUrl: 'app/common-directives/pager-filter/pager-filter.tpl.html',
            restrict: 'A',
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            
            var filterControl = element.find('filterControl');
            var filterContainer = angular.element(document.querySelector('#page-filter-container'));
            
            scope.onResize = function() {
                var windowWidth = $window.innerWidth;
                $timeout(function() {
                    scope.$apply(function() {
                        if (windowWidth <= 990) {
                            scope.filterFallback = true;
                        }
                        else {
                            scope.filterFallback = false;
                            
                        }
                    })
                });
            }

            scope.onResize();

            
            element.bind("click", function(ev) {
                if (ev.target.getAttribute('id') === "filterControl") {
                    if (filterContainer.hasClass('open')) {
                        filterContainer.removeClass('open');
                    }
                    else {
                        filterContainer.addClass('open');
                    }
                }

            });

        }

        pagerFilterCntrl.$injector = ['$scope', '$interval', '$window', '$document', 'dealsApi'];

        function pagerFilterCntrl($scope, $interval, $window, $document, $rootScope, dealsApi) {
            var vm = this;
            vm.categories = dealsApi.returnCategories();
            vm.selectedMerchantTypes = null;
            vm.filterMerchantsCategories = [];
            vm.clearFilter = function(filter) {
                var spliceIndex = vm.filterMerchantsCategories.indexOf(filter);
                vm.filterMerchantsCategories.splice(spliceIndex, 1);
                var sorted = vm.categories.merchant_category.map(function(obj) {
                    return obj.value;
                });
                var index = sorted.indexOf(filter);
                vm.categories.merchant_category[index].checked = false;
                vm.filterChanged();
            }

            vm.filterChanged = function(ev) {
                vm.filterMerchantsCategories = [];
                for (var x = 0; x < vm.categories.merchant_category.length; x++) {
                    if (vm.categories.merchant_category[x].checked === true) {
                        vm.filterMerchantsCategories.push(vm.categories.merchant_category[x].value);
                    }
                }
                $rootScope.$broadcast('load-instructer', {
                    type: 'filter-change',
                    merchant_category: vm.filterMerchantsCategories
                });
                
                return true;
            }
        }

    }

})();