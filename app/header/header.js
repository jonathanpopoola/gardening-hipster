(function() {
    
    'use strict';
    
    angular.module('gardeningHipster.header', ['gardeningHipster.searchBar', 'gardeningHipster.navverService'])
    .directive('gardeningHeader', gardeningHeader);
    
    function gardeningHeader() {
        
        var directive = {
            link: link,
            scope: {
                'title' : '@'
            },
            templateUrl: 'app/header/header.tpl.html',
            restrict: 'A',
            controller: dirCntrl,
            controllerAs: 'header'
        };
        return directive;
        
        function link(scope, element, attrs) {

        }
        
        function dirCntrl(navverService) {
            var vm = this;
            
            vm.toggleMenu = function() {
                if(navverService.returnState() === 'closed') {
                    navverService.show();
                }else {
                    navverService.hide();
                }
            }
            
        }
        
    }
    
})();