bugTrackerApp.directive('bugList', ['Bug', function (Bug) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            scope.bugItemEditModeFlag = {};
            scope.bugListInfo = [];
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

            Bug.find().then(function (res) {
                if (Object.prototype.toString.call(res) === '[object Array]') {
                    res.map(function (item) {
                        scope.bugListInfo.push(new Bug(item));
                    });
                } else {
                    scope.bugListInfo.push(new Bug(res));
                }
            });

            for (var i = 0; i<scope.bugListInfo.length; i=i+1) {
                scope.bugItemEditModeFlag[i] = false;
            }

            scope.switchMode = function (evt, index) {
                if (evt) evt.stopPropagation();

                scope.bugItemEditModeFlag[index] = !scope.bugItemEditModeFlag[index];

                if (!scope.bugItemEditModeFlag[index]) {
                    console.log('[U3D] Send to BE');
                }
            };

            scope.toggleList = function (evt, listName) {
                if (evt) evt.stopPropagation();

                scope.listFlag[listName] = !scope.listFlag[listName];
                scope.warningIcon[listName] = false;
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

            scope.deleteItem = function (evt, bugId) {
                $('#delet-alert').css('display', 'block');
                $('#delet-alert').dialog({
                    'resizable': false,
                    'width': 300,
                    'height': 150,
                    'modal': true,
                    'buttons': {
                        'Delete': function() {
                            var data = {
                                'id': bugId
                            };
                            Bug.delete(data).then(function () {
                                //Remove font-end data.
                                for (var i=0; i<scope.bugListInfo.length; i++) {
                                    if (scope.bugListInfo[i].id === bugId) {
                                        scope.bugListInfo.splice(i, 1);
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

        },
        templateUrl: 'views/leave/bug-list.html'
    };
}]);

