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
                    'name': 'Add user',
                    'type': 'addUser',
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
                    scope.trackerActions[3].enable = false;
                break;
                case 'qa':
                case 'pm':
                    scope.trackerActions[2].enable = false;
                    scope.trackerActions[3].enable = false;
                break;
                case 'admin':
                    scope.trackerActions[2].enable = false;
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
        templateUrl: 'views/tracker/bug-tracker.html'
    };
}]);

