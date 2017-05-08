bugTrackerApp.directive('myBugs', ['Bug', function (Bug) {
    return {
        restrict: 'E',
        link: function (scope, element) {

            scope.bugListInfo = [];
            scope.userType = tracker.user.type;

            Bug.find().then(function (res) {
                initBugListInfo(res);
            });

            scope.updateStatus = function (evt, index) {
                if (evt) evt.stopPropagation();

                var status = scope.bugListInfo[index].status,
                    data = {
                        'owner_id': tracker.user.id,
                        'owner_name': tracker.user.name,
                        'status': 'Unsolved'
                    };

                if (status === 'In progress') {
                    data.status = 'Solved'
                } else if (status = 'Solved') {
                    data.status = 'In progress'
                }

                scope.bugListInfo[index].updateStatus(data).then(function (res) {
                    scope.bugListInfo[index].status = res.status;
                });
            };

            function validation () {
                if (scope.warningIcon.desc &&
                    scope.warningIcon.summary) {
                    return false;
                } else {
                    return true;
                }
            }

            function initBugListInfo (res) {
                if (Object.prototype.toString.call(res) === '[object Array]') {
                    res.map(function (item) {
                        scope.bugListInfo.push(new Bug(item));
                    });
                } else {
                    scope.bugListInfo.push(new Bug(res));
                }
            }
        },
        templateUrl: 'views/leave/my-bugs.html'
    };
}]);

