(function() {

    'use strict';

    angular.module('gardeningHipster.navverService', [])
        .factory('navverService', navverService);

    function navverService() {

        var service = {};
        
        var menu = angular.element(document.querySelector('#nav-wrapper'));
        var wrapper = angular.element(document.querySelector('#wrapper'));
        var state = 'closed';
        service.show = function(name) {
            menu.addClass('menu-open');
            wrapper.addClass('menu-open');
            state = 'open';
        }

        service.hide = function(name) {
            menu.removeClass('menu-open');
            wrapper.removeClass('menu-open');
            state = 'closed';
        }
        
        service.returnState = function() {
            return state;
        }

        var publicApi = {
            hide: service.hide,
            show: service.show,
            returnState : service.returnState
        }

        return publicApi;

    }

})();