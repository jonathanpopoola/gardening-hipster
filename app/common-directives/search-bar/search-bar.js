(function() {

    'use strict';

    angular.module('gardeningHipster.searchBar', ['gardeningHipster.searchApi'])
        .directive('searchBar', searchBar);

    function searchBar($timeout, $window) {

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'searchBar',
            templateUrl: 'app/common-directives/search-bar/search-bar.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var timer;
            element.bind("mouseleave", function() {
                timer = $timeout(
                    function() {
                        scope.resetSearch();
                    },
                    1000
                );
            });
            element.bind("mouseenter", function() {
                if (typeof timer != 'undefined') {
                    $timeout.cancel(timer);
                }
            });

            scope.onResize = function() {
                var windowWidth = $window.innerWidth;
                $timeout(function() {
                    scope.$apply(function() {
                        if (windowWidth <= 990) {
                            scope.fallBackActivated = true;
                        }
                        else {
                            scope.fallBackActivated = false;
                        }
                    })
                });
            }

            scope.onResize();

            angular.element($window).bind('resize', function() {
                scope.onResize();
            })
            
            var tabletSeachElem = angular.element(document.querySelector('#tabletSearchInput'));
            tabletSeachElem.bind("focus", function() {
                tabletSeachElem.addClass('expanded');
            });
            tabletSeachElem.bind("blur", function() {
                tabletSeachElem.removeClass('expanded');
            });



        }

        dirCntrl.$injector = ['gardeningHipster.searchApi'];

        function dirCntrl($rootScope, $scope, $timeout, searchApi) {
            var vm = this;
            vm.searchTerm = null;
            vm.results = null;
            vm.searchInputChange = function() {
                if (vm.searchTerm.length >= 3) {
                    var args = {
                        searchTerm: vm.searchTerm
                    };
                    searchApi.getSearchResults(args).then(function() {
                        vm.results = searchApi.searchCache();
                    });
                }
                else {
                    vm.results = null;
                }
            }

            $scope.resetSearch = function() {
                vm.searchTerm = null;
                vm.results = null;
            }

            $scope.$on(
                "$destroy",
                function(event) {
                    
                }
            );

        }

    }

})();