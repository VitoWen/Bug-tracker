bugTrackerApp.factory('User', ['$http', 'apiHelper', function ($http, apiHelper) {

    function User(o) {
        if (arguments.length > 0) this.init(o);
    }

    User.login = function (params) {
        var url = tracker.apiUrl + '/user/login';

        return apiHelper.filter($http.post(url, params));
    };

    User.prototype.init = function (o) {
        var obj = angular.extend({}, o);

        this.id = obj.id;
        this.name = obj.name;
        this.pwd = obj.pwd;
        this.type = obj.type;
        this.department = obj.department;
        this.title = obj.title;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    return User;
}]);
