bugTrackerApp.directive('bugTracker', ['$state', function ($state) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            var userType = tracker.user.type;

            scope.trackerActions = [
                {
                    'name': 'Bug report',
                    'type': 'bugReport',
                    'enable': true
                }, {
                    'name': 'Bug list',
                    'type': 'bugList',
                    'enable': true
                }, {
                    'name': 'My bugs',
                    'type': 'myBugs',
                    'enable': true
                }, {
                    'name': 'Logout',
                    'type': 'logout',
                    'enable': true
                }
            ];
            scope.currentActive = 'bugReport';

            switch (userType) {
                case 'rd':
                    scope.currentActive = 'myBugs';
                    scope.trackerActions[0].enable = false;
                break;
                case 'qa':
                case 'pm':
                    scope.trackerActions[2].enable = false;
                break;
                case 'admin':
                break;
                default:
                    //Allow all actions.
                break;
            }

            scope.triggerActions = function (evt, type) {
                if (evt) evt.stopPropagation();

                if (type === 'logout') {
                    $state.go('home');
                } else {
                    scope.currentActive = type;
                }
            };
        },
        templateUrl: 'views/leave/bug-tracker.html'
    };
}]);

