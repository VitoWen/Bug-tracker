bugTrackerApp.directive('bugTracker', ['$state', function ($state) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            var userType = tracker.user.type;

            scope.trackerActions = [
                {
                    'name': 'Bug report',
                    'type': 'bugReport',
                    'allow': {'qa': true, 'admin': true}
                }, {
                    'name': 'Bug list',
                    'type': 'bugList',
                    'allow': {'qa': true, 'rd': true, 'admin': true}
                }, {
                    'name': 'My bugs',
                    'type': 'myBugs',
                    'allow': {'rd': true}
                }, {
                    'name': 'Feature create',
                    'type': 'featureCreate',
                    'allow': {'pm': true, 'admin': true}
                }, {
                    'name': 'Feature list',
                    'type': 'featureList',
                    'allow': {'pm': true, 'rd': true, 'admin': true}
                }, {
                    'name': 'My features',
                    'type': 'myFeatures',
                    'allow': {'rd': true}
                }, {
                    'name': 'Add user',
                    'type': 'addUser',
                    'allow': {'admin': true}
                }, {
                    'name': 'Logout',
                    'type': 'logout',
                    'allow': {'qa': true, 'rd': true, 'pm': true, 'admin': true}
                }
            ];

            switch (userType) {
                case 'qa':
                    scope.currentActive = 'bugReport';
                break;
                case 'rd':
                    scope.currentActive = 'myBugs';
                break;
                case 'pm':
                    scope.currentActive = 'featureCreate';
                break;
                default:
                    scope.currentActive = 'bugReport';
                break;

            }
            scope.userType = userType;

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

