(function() {
    
    'use strict';
    
    angular.module('gardeningHipster.navver', ['gardeningHipster.navverService'])
    .directive('gardeningNavver', gardeningNavver);
    
    function gardeningNavver(navverService) {
        
        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'navver',
            bindToController: false,
            templateUrl: 'app/common-directives/navver/navver.tpl.html',
            restrict: 'A' 
        };
        return directive;
        
        function link(scope, element, attrs) {
            
            element.bind("click", function(ev) {
                if (ev.target.getAttribute('href')) {
                    navverService.hide();
                }

            });

        }
        
        function dirCntrl($scope) {
            var vm = this;     
        }
        
    }
    
})();