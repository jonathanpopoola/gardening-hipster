(function() {

    'use strict';

    angular.module('gardeningHipster.dealElement', ['gardeningHipster.utils'])
        .directive('dealElement', dealElement);

    function dealElement() { 

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'deal',
            scope: {
                'deal': '=deal'
            },
            templateUrl: 'app/common-directives/deal-element/deal-element.tpl.html',
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