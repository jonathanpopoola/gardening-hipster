(function() {

    'use strict';

    angular.module('gardeningHipster.loaderService', [])
        .factory('loaderService', loaderService);

    function loaderService() {

        var service = {};
        service.loaders = {};
        service.register = function(data) {
            if (!data.hasOwnProperty('loaderName') || typeof data.loaderName == 'undefined') {
                throw new Error("loader must specify a name when registering with the loader service.");
            }
            if (service.loaders.hasOwnProperty(data.loaderName)) {
                throw new Error("A loader with the name '" + data.loaderName + "' has already been registered.");
            }
            service.loaders[data.loaderName] = data;
        }

        service.show = function(name) {
            var loader = service.loaders[name];
            if (loader) {
                loader.show();
            }
            
        }

        service.hide = function(name) {
            var loader = service.loaders[name];
            if (!loader) {
                throw new Error("No loader named '" + name + "' is registered.");
            }
            loader.hide();
        }

        var publicApi = {
            hide: service.hide,
            show: service.show,
            register: service.register
        }

        return publicApi;

    }

})();