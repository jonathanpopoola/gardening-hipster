(function() {

    'use strict';

    angular.module('gardeningHipster.dealElementMini', ['gardeningHipster.utils', 'gardeningHipster.htmlFilter'])
        .directive('dealElementMini', dealElementMini);

    function dealElementMini() { 

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'deal',
            scope: {
                'deal': '=deal'
            },
            templateUrl: 'app/common-directives/deal-element-mini/deal-element-mini.tpl.html',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            // element.bind("mouseenter", function() {
            // })
        }

        dirCntrl.$injector = ['gardeningHipster.tdFactory'];
        function dirCntrl($rootScope, utilsFactory) {

            var vm = this;

        }

    }

})();