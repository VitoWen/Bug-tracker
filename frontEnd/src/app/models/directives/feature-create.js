bugTrackerApp.directive('featureCreate', ['Feature', '$timeout', function (Feature, $timeout) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            scope.warningIcon = {
                'purpose': false,
                'desc': false
            };
            scope.userInfo = tracker.user;
            scope.submited = false;
            scope.createSuccess = false;
            scope.createFail = false;

            scope.submit = function (evt) {
                if (evt) evt.stopPropagation();

                var $elem = $((evt.target || evt.srcElement)),
                    params = $elem.serializeJSON({
                        parseAll: false,
                        parseNumbers: false
                    }),
                    data = {};

                scope.submited = true;
                scope.warningIcon.purpose = params.tracker.purpose.length ? false : true;
                scope.warningIcon.desc = params.tracker.desc.length ? false : true;

                if (validation()) {
                    for (var featureInfo in params.tracker) {
                        if (params.tracker.hasOwnProperty(featureInfo)) {
                            data[featureInfo] = params.tracker[featureInfo];
                        }
                    }
                    data.reporter_id = tracker.user.id;
                    data.reporter_name = tracker.user.name;

                    Feature.create(data).then(function () {
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
                if (scope.warningIcon.purpose ||
                    scope.warningIcon.desc) {
                    return false;
                } else {
                    return true;
                }
            }

            function resetValue () {
                scope.desc = '';
                scope.purpose = '';
                scope.submited = false;
                scope.createSuccess = false;
                scope.createFail = false;
            }
        },
        templateUrl: 'views/tracker/feature-create.html'
    };
}]);

