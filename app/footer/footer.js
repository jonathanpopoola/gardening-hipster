(function() {
    
    'use strict';
    
    angular.module('gardeningHipster.footer', [])
    .directive('gardeningFooter', gardeningFooter);
    
    function gardeningFooter() {
        
        var directive = {
            link: link,
            scope: {
                'title' : '@'
            },
            templateUrl: 'app/footer/footer.tpl.html',
            restrict: 'A' 
        };
        return directive;
        
        function link(scope, element, attrs) {

        }
        
    }
    
})();