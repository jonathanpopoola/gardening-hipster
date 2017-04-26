You should not modify any files in the /wire/ directory as this comprises
the ProcessWire core and is typically replaced entirely during upgrades. 

To install new modules, you would place them in /site/modules/ rather than
/wire/modules. 

To install a new admin theme, you would place it in /site/templates-admin/
and leave the one that is in /wire/templates-admin/.

To install a new version of ProcessWire, replace this /wire/ directory 
completely with the one from the new version. See the main README.txt
file in the root installation directory for more information about
performing upgrades. 

  // response from service is string transforming back to json so can be handle by angular
  angular.module( 'sonytest.sonyTransform', [
    ]).factory('sonyTransform', function(){ 
      return {
        stringTransform: function(data) {
          try {
            JSON.parse(data);
          }catch (e){
            console.warn(e);
            var reg1= new RegExp("{", "g");
            var reg2 = new RegExp(":", "g");
            var replaced = data.replace(reg1, '{"').replace(reg2, '":');
            return JSON.parse(replaced);
          } 
          return data;
        }
      };
    }); 



login: function(args) {
        var $this = this;
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: $this.domain+"/signin/"+args.username+"/"+args.password,
          transformResponse: sonyTransform.stringTransform
        }).
        success(function(data) {
          $this.user = data;
          $this.setAuthHeader();
          $this.setUserSession();
          deferred.resolve();
        }).
        error(function(data) {
          deferred.reject(data);
        });
        return deferred.promise;

      },
