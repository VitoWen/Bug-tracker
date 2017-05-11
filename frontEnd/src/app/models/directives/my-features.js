bugTrackerApp.directive('myFeatures', ['Feature', function (Feature) {
    return {
        restrict: 'E',
        link: function (scope, element) {

            scope.featureListInfo = [];
            scope.userType = tracker.user.type;

            Feature.find().then(function (res) {
                initFeatureListInfo(res);
            });

            scope.updateStatus = function (evt, index) {
                if (evt) evt.stopPropagation();

                var status = scope.featureListInfo[index].status,
                    data = {
                        'owner_id': tracker.user.id,
                        'owner_name': tracker.user.name,
                        'status': 'Unsolved'
                    };

                if (status === 'In progress') {
                    data.status = 'Solved';
                } else if (status === 'Solved') {
                    data.status = 'In progress';
                }

                scope.featureListInfo[index].updateStatus(data).then(function (res) {
                    scope.featureListInfo[index].status = res.status;
                });
            };

            function initFeatureListInfo (res) {
                if (Object.prototype.toString.call(res) === '[object Array]') {
                    res.map(function (item) {
                        scope.featureListInfo.push(new Feature(item));
                    });
                } else {
                    scope.featureListInfo.push(new Feature(res));
                }
            }
        },
        templateUrl: 'views/tracker/my-features.html'
    };
}]);

