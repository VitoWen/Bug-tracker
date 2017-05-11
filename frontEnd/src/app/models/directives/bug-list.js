bugTrackerApp.directive('bugList', ['Bug', function (Bug) {
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
            scope.bugItemEditModeFlag = {};
            scope.bugListInfo = [];
            scope.selectedSeverity = 'Minor';
            scope.selectedPriority = 'Medium';
            scope.userType = tracker.user.type;

            if (scope.userType === 'rd') {
                Bug.findAll().then(function (res) {
                    initBugListInfo(res);
                });
            } else {
                Bug.find().then(function (res) {
                    initBugListInfo(res);
                });
            }

            for (var i = 0; i<scope.bugListInfo.length; i=i+1) {
                scope.bugItemEditModeFlag[i] = false;
            }

            scope.updateBug = function (evt, index) {
                if (evt) evt.stopPropagation();

                scope.bugItemEditModeFlag[index] = !scope.bugItemEditModeFlag[index];

                if (!scope.bugItemEditModeFlag[index]) {
                    if (validation()) {
                        scope.bugListInfo[index].update().then(function (res) {
                            // Do nothing.
                        });
                    }
                }
            };

            scope.toggleList = function (evt, listName) {
                if (evt) evt.stopPropagation();

                scope.listFlag[listName] = !scope.listFlag[listName];
            };

            scope.setSeverityType = function (evt, severity, id) {
                if (evt) evt.stopPropagation();

                scope.bugListInfo.map(function (item) {
                    if (item.id === id) {
                        item.severity = severity;
                    }
                });
                scope.listFlag.severityType = false;
            };

            scope.setPriority = function (evt, priority, id) {
                if (evt) evt.stopPropagation();

                scope.bugListInfo.map(function (item) {
                    if (item.id === id) {
                        item.priority = priority;
                    }
                });
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

            scope.updateOwner = function (evt, index) {
                if (evt) evt.stopPropagation();

                var data = {
                    'owner_id': '',
                    'owner_name': '',
                    'status': 'Unsolved'
                };

                if (scope.bugListInfo[index].owner_id === '') {
                    data.owner_id = tracker.user.id;
                    data.owner_name = tracker.user.name;
                    data.status = 'In progress';
                }
                scope.bugListInfo[index].updateStatus(data).then(function (res) {
                    // Do nothing.
                    scope.bugListInfo[index].owner_id = res.owner_id;
                    scope.bugListInfo[index].owner_name = res.owner_name;
                    scope.bugListInfo[index].status = res.status;
                });
            };

            function validation () {
                if (scope.warningIcon.desc ||
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
        templateUrl: 'views/tracker/bug-list.html'
    };
}]);

