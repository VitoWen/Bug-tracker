bugTrackerApp.factory('apiHelper', ['$timeout', '$q', function($timeout, $q) {

    return {
        promise: function(callback) {
            var deferred = $q.defer();
            callback(deferred);
            return deferred.promise;
        },

        filter: function(promise) {
            return this.promise(function(deferred) {
                promise.then(function(resp) {
                    var data = resp.data;

                    if (resp.status === 200 && data.success === false) {
                        deferred.reject();
                    } else {
                        if (data.res.length > 1) {
                            deferred.resolve(data.res);
                        } else {
                           deferred.resolve(data.res[0]);
                        }
                    }

                }, function(resp) {
                    console.error('[U3D] Access api fail, err:', resp);

                    deferred.reject();
                });
            });

        }
    };

}]);
