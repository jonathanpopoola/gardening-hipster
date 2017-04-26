(function() {
  angular.module('gardeningHipster.htmlFilter', []).filter('htmlFilter',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
})
})();
