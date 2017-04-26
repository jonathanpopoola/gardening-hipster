(function() {

    'use strict';

    angular.module('gardeningHipster.newsElement', ['gardeningHipster.utils'])
        .directive('newsElement', newsElement);

    function newsElement() {

        var directive = {
            link: link,
            controller: dirCntrl,
            controllerAs: 'news',
            scope: {
                'newsarticle': '=newsarticle'
            },
            templateUrl: 'app/common-directives/news-element/news-element.tpl.html',
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