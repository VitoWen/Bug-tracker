bugTrackerApp.factory('Bug', ['$http', 'apiHelper', function ($http, apiHelper) {

    function Bug(o) {
        if (arguments.length > 0) this.init(o);
    }

    Bug.findAll = function () {
        var url = tracker.apiUrl + '/bug/list/all';

        return apiHelper.filter($http.get(url));
    };

    Bug.find = function () {
        var url = tracker.apiUrl + '/bug/list/' + tracker.user.id;

        return apiHelper.filter($http.get(url));
    };

    Bug.create = function (params) {
        var url = tracker.apiUrl + '/bug/create';

        return apiHelper.filter($http.post(url, params));
    };

    Bug.delete = function (params) {
        var url = tracker.apiUrl + '/bug/delete/' + params.id;

        return apiHelper.filter($http.get(url, params));
    };

    Bug.prototype.update = function () {
        var url = tracker.apiUrl + '/bug/update',
            params = {
                'id': this.id,
                'severity': this.severity,
                'priority': this.priority,
                'summary': this.summary,
                'desc': this.desc,
            };

        return apiHelper.filter($http.post(url, params));
    };

    Bug.prototype.updateStatus = function (params) {
        var url = tracker.apiUrl + '/bug/update/status',
            params = {
                'id': this.id,
                'owner_id': params.owner_id,
                'owner_name': params.owner_name,
                'status': params.status
            };

        return apiHelper.filter($http.post(url, params));
    };

    Bug.prototype.init = function (o) {
        var obj = angular.extend({}, o);

        this.id = obj.id;
        this.status = obj.status;
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
