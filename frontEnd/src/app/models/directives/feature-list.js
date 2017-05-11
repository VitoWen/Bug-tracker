bugTrackerApp.directive('featureList', ['Feature', function (Feature) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            scope.warningIcon = {
                'purpose': false,
                'desc': false
            };
            scope.featureItemEditModeFlag = {};
            scope.featureListInfo = [];
            scope.userType = tracker.user.type;

            if (scope.userType === 'rd') {
                Feature.findAll().then(function (res) {
                    initFeatureListInfo(res);
                });
            } else {
                Feature.find().then(function (res) {
                    initFeatureListInfo(res);
                });
            }

            for (var i = 0; i<scope.featureListInfo.length; i=i+1) {
                scope.featureItemEditModeFlag[i] = false;
            }

            scope.updateFeature = function (evt, index) {
                if (evt) evt.stopPropagation();

                scope.featureItemEditModeFlag[index] = !scope.featureItemEditModeFlag[index];

                if (!scope.featureItemEditModeFlag[index]) {
                    if (validation()) {
                        scope.featureListInfo[index].update().then(function (res) {
                            // Do nothing.
                        });
                    }
                }
            };

            scope.deleteItem = function (evt, featureId) {
                $('#delet-alert').css('display', 'block');
                $('#delet-alert').dialog({
                    'resizable': false,
                    'width': 300,
                    'height': 150,
                    'modal': true,
                    'buttons': {
                        'Delete': function() {
                            var data = {
                                'id': featureId
                            };

                            Feature.delete(data).then(function () {
                                //Remove font-end data.
                                for (var i=0; i<scope.featureListInfo.length; i++) {
                                    if (scope.featureListInfo[i].id === featureId) {
                                        scope.featureListInfo.splice(i, 1);
                                    }
                                }
                            });
                            $(this).dialog( "close" );
                        },
                        'Cancel': function() {
                            $(this).dialog( "close" );
                        }
                    }
                });
            };

            scope.updateOwner = function (evt, index) {
                if (evt) evt.stopPropagation();

                var data = {
                    'owner_id': '',
                    'owner_name': '',
                    'status': 'Unsolved'
                };

                if (scope.featureListInfo[index].owner_id === '') {
                    data.owner_id = tracker.user.id;
                    data.owner_name = tracker.user.name;
                    data.status = 'In progress';
                }
                scope.featureListInfo[index].updateStatus(data).then(function (res) {
                    // Do nothing.
                    scope.featureListInfo[index].owner_id = res.owner_id;
                    scope.featureListInfo[index].owner_name = res.owner_name;
                    scope.featureListInfo[index].status = res.status;
                });
            };

            function validation () {
                if (scope.warningIcon.purpose ||
                    scope.warningIcon.desc) {
                    return false;
                } else {
                    return true;
                }
            }

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
        templateUrl: 'views/tracker/feature-list.html'
    };
}]);

