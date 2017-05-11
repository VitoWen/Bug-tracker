bugTrackerApp.directive('addUser', ['User', '$timeout', function (User, $timeout) {
    return {
        restrict: 'E',
        link: function (scope, element) {
            scope.listFlag = {
                'department': false,
                'title': false,
                'userType': false
            };
            scope.warningIcon = {
                'name': false,
                'pwd': false
            };
            scope.departmentList = [
                'R&D',
                'QA'
            ];
            scope.titleList = [
                'Engineer',
                'Senior egnineer',
                'Staff egnineer',
                'Section manager',
                'Project manager'
            ];
            scope.userTypeList = [
                {
                    'name': 'R&D',
                    'value': 'rd'
                }, {
                    'name': 'QA',
                    'value': 'qa'
                }, {
                    'name': 'Project manager',
                    'value': 'pm'
                }, {
                    'name': 'Admin',
                    'value': 'admin'
                }
            ];
            scope.bugItemEditModeFlag = {};
            scope.bugListInfo = [];
            scope.selectedDep = 'R&D';
            scope.selectedTitle = 'Engineer';
            scope.selectedUserTypeName = 'R&D';
            scope.selectedUserTypeVal = 'rd';
            scope.createSuccess = false;
            scope.createFail = false;

            scope.toggleList = function (evt, listName) {
                if (evt) evt.stopPropagation();

                scope.listFlag[listName] = !scope.listFlag[listName];
            };

            scope.setValue = function (evt, type, val) {
                if (evt) evt.stopPropagation();

                switch (type) {
                    case 'department':
                        scope.selectedDep = val;
                    break;
                    case 'title':
                        scope.selectedTitle = val;
                    break;
                    case 'userType':
                        scope.selectedUserTypeName = val.name;
                        scope.selectedUserTypeVal = val.value;
                    break;
                    default:
                    break;
                }

                scope.listFlag[type] = false;
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
                scope.warningIcon.name = params.userInfo.name.length ? false : true;
                scope.warningIcon.pwd = params.userInfo.pwd.length ? false : true;

                if (validation()) {
                    data.name = params.userInfo.name;
                    data.pwd = params.userInfo.pwd;
                    data.type = scope.selectedUserTypeVal;
                    data.department = params.userInfo.selectedDep;
                    data.title = params.userInfo.selectedTitle;

                    User.create(data).then(function () {
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
                if (scope.warningIcon.name ||
                    scope.warningIcon.pwd) {
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

            function resetValue () {
                scope.name = '';
                scope.pwd = '';
                scope.selectedDep = 'R&D';
                scope.selectedTitle = 'Engineer';
                scope.selectedUserTypeName = 'R&D';
                scope.selectedUserTypeVal = 'rd';
                scope.createSuccess = false;
                scope.createFail = false;
            }
        },
        templateUrl: 'views/tracker/add-user.html'
    };
}]);

