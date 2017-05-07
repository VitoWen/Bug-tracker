bugTrackerApp.controller('loginTracker', ['$scope', '$state', 'User', function ($scope, $state, User) {

    $scope.warningIcon = {
        'name': false,
        'pwd': false
    };
    $scope.loginFail = false;

    $scope.login = function (evt) {
        if(evt) evt.stopPropagation();
        var $elem = $((evt.target || evt.srcElement)),
            params = $elem.serializeJSON({
                parseAll: false,
                parseNumbers: false
            }),
            data = {};

        $scope.warningIcon.name = params.login.name.length ? false : true;
        $scope.warningIcon.pwd = params.login.pwd.length ? false : true;

        if (validation()) {
            data = {
                'name': params.login.name,
                'pwd': params.login.pwd
            };
            User.login(data).then(function (res) {
                tracker.user = new User(res);
                $state.go('tracker');
            }, function () {
                $scope.loginFail = true;
            });
        }
    };

    $scope.disableWarning = function () {
        $scope.warningIcon.name = false;
        $scope.warningIcon.pwd = false;
        $scope.loginFail = false;
    };

    function validation() {
        if ($scope.warningIcon.name &&
            $scope.warningIcon.pwd) {
            return false;
        } else {
            return true;
        }
    }
}]);


