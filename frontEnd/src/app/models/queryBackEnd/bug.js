bugTrackerApp.factory('Bug', ['$http', 'apiHelper', function ($http, apiHelper) {

    function Bug(o) {
        if (arguments.length > 0) this.init(o);
    }
    Bug.find = function (params) {
        var url = tracker.apiUrl + '/bug/list/' + tracker.user.id;

        return apiHelper.filter($http.get(url, params));
    };

    Bug.create = function (params) {
        var url = tracker.apiUrl + '/bug/create';

        return apiHelper.filter($http.post(url, params));
    };

    Bug.delete = function (params) {
        var url = tracker.apiUrl + '/bug/delete/' + params.id;

        return apiHelper.filter($http.get(url, params));
    };

    Bug.prototype.init = function (o) {
        var obj = angular.extend({}, o);

        this.id = obj.id;
        this.reporter_id = obj.reporter_id;
        this.reporter_name = obj.reporter_name;
        this.owner_id = obj.owner_id;
        this.owner_name = obj.owner_name;
        this.severity = obj.severity;
        this.priority = obj.priority;
        this.summary = obj.summary;
        this.desc = obj.desc;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    return Bug;
}]);
