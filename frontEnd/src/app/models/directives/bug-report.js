bugTrackerApp.directive('bugReport', ['Bug', '$timeout', function (Bug, $timeout) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            scope.listFlag = {
                'severityType': false,
                'priorityType': false
            };
            scope.warningIcon = {
                'desc': false,
                'summary': false
            };
            scope.severityList = [
                'Critical',
                'Major',
                'Moderate',
                'Minor',
                'Cosmetic'
            ];
            scope.priorityList = [
                'High',
                'Medium',
                'Low'
            ];
            scope.severityType = '';
            scope.userInfo = tracker.user;
            scope.selectedSeverity = 'Minor';
            scope.selectedPriority = 'Medium';
            scope.submited = false;
            scope.createSuccess = false;
            scope.createFail = false;

            scope.triggerActions = function (evt, type) {
                if (evt) evt.stopPropagation();

                scope.currentActive = type;
            };

            scope.toggleList = function (evt, listName) {
                if (evt) evt.stopPropagation();

                scope.listFlag[listName] = !scope.listFlag[listName];
            };

            scope.setSeverityType = function (evt, severity) {
                if (evt) evt.stopPropagation();

                scope.selectedSeverity = severity;
                scope.listFlag.severityType = false;
            };

            scope.setPriority = function (evt, priority) {
                if (evt) evt.stopPropagation();

                scope.selectedPriority = priority;
                scope.listFlag.priorityType = false;
            };

            scope.submit = function (evt) {
                if (evt) evt.stopPropagation();

                var $elem = $((evt.target || evt.srcElement)),
                    params = $elem.serializeJSON({
                        parseAll: false,
                        parseNumbers: false
                    }),
                    data = {};

                scope.submited = true;
                scope.warningIcon.desc = params.tracker.desc.length ? false : true;
                scope.warningIcon.summary = params.tracker.summary.length ? false : true;

                if (validation()) {
                    for (var bugInfo in params.tracker) {
                        if (params.tracker.hasOwnProperty(bugInfo)) {
                            if (bugInfo === 'selectedSeverity') {
                                data.severity = params.tracker[bugInfo];
                            } else if (bugInfo === 'selectedPriority') {
                                data.priority = params.tracker[bugInfo];
                            } else {
                                data[bugInfo] = params.tracker[bugInfo];
                            }

                        }
                    }
                    data.reporter_id = tracker.user.id;
                    data.reporter_name = tracker.user.name;

                    Bug.create(data).then(function () {
                        scope.createSuccess = true;
                        $timeout(function () {
                            resetValue();
                        }, 1000);
                    }, function () {
                        scope.createFail = true;
                        $timeout(function () {
                            resetValue();
                        }, 2000);
                    });
                }
            };

            function validation () {
                if (scope.warningIcon.desc ||
                    scope.warningIcon.summary) {
                    return false;
                } else {
                    return true;
                }
            }

            function resetValue () {
                scope.selectedSeverity = 'Minor';
                scope.selectedPriority = 'Medium';
                scope.desc = '';
                scope.summary = '';
                scope.submited = false;
                scope.createSuccess = false;
                scope.createFail = false;
            }
        },
        templateUrl: 'views/leave/bug-report.html'
    };
}]);

