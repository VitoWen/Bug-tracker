bugTrackerApp.factory('Feature', ['$http', 'apiHelper', function ($http, apiHelper) {

    function Feature(o) {
        if (arguments.length > 0) this.init(o);
    }

    Feature.findAll = function () {
        var url = tracker.apiUrl + '/feature/list/all';

        return apiHelper.filter($http.get(url));
    };

    Feature.find = function () {
        var url = tracker.apiUrl + '/feature/list/' + tracker.user.id;

        return apiHelper.filter($http.get(url));
    };

    Feature.create = function (params) {
        var url = tracker.apiUrl + '/feature/create';

        return apiHelper.filter($http.post(url, params));
    };

    Feature.delete = function (params) {
        var url = tracker.apiUrl + '/feature/delete/' + params.id;

        return apiHelper.filter($http.get(url, params));
    };

    Feature.prototype.update = function () {
        var url = tracker.apiUrl + '/feature/update',
            params = {
                'id': this.id,
                'purpose': this.summary,
                'desc': this.desc,
            };

        return apiHelper.filter($http.post(url, params));
    };

    Feature.prototype.updateStatus = function (params) {
        var url = tracker.apiUrl + '/feature/update/status',
            oData = {
                'id': this.id,
                'owner_id': params.owner_id,
                'owner_name': params.owner_name,
                'status': params.status
            };

        return apiHelper.filter($http.post(url, oData));
    };

    Feature.prototype.init = function (o) {
        var obj = angular.extend({}, o);

        this.id = obj.id;
        this.status = obj.status;
        this.reporter_id = obj.reporter_id;
        this.reporter_name = obj.reporter_name;
        this.owner_id = obj.owner_id;
        this.owner_name = obj.owner_name;
        this.purpose = obj.purpose;
        this.desc = obj.desc;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    return Feature;
}]);
