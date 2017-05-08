var sugar = require('sugar'),
    url = require("url"),
    path = require("path"),
    async = require("async"),
    bugModel = require('../models/bugModel.js'),
    bug = new bugModel(),
    userModel = require('../models/userModel.js'),
    user = new userModel();

exports.listAll = function (req, res) {
    var bugData = {
            'reporter_id': '',
            'owner_id': ''
        },
        finalRes = {};

    async.series({
        getBugList: function (cb) {
            console.log('[U3D] Controllers - bug listAll');
            bug.bugFind(bugData, function (res) {
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

exports.list = function (req, res) {
    var userData = {
            'id': req.params.user_id
        },
        bugData = {
            'reporter_id': '',
            'owner_id': ''
        },
        finalRes = {};

    async.series({
        userFindById: function (cb) {
            user.userFindById(userData, function (res) {
                if (res.type === 'qa') {
                    bugData.reporter_id = res.id;
                } else if (res.type === 'rd') {
                    bugData.owner_id = res.id;
                }
                cb();
            });
        },
        getBugList: function (cb) {
            console.log('[U3D] Controllers - bug list');
            bug.bugFind(bugData, function (res) {
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

exports.create = function (req, res) {
    var data = {
            'reporter_id': req.body.reporter_id,
            'reporter_name': req.body.reporter_name,
            'owner_id': req.body.owner_id,
            'owner_name': req.body.owner_name,
            'severity': req.body.severity,
            'priority': req.body.priority,
            'summary': req.body.summary,
            'desc': req.body.desc,
        },
        finalRes = {};

    async.auto({
        createBug: function (cb) {
            console.log('[U3D] Controllers - bug create');
            bug.bugCreate(data, function (res) {
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

exports.delete = function (req, res) {
    var data = {
            'id': req.params.id
        },
        finalRes = {};

    async.auto({
        deletBug: function (cb) {
            console.log('[U3D] Controllers - bug delete');
            bug.bugDelete(data, function (res) {
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

exports.update = function (req, res) {
    var data = {
            'id': req.body.id,
            'severity': req.body.severity,
            'priority': req.body.priority,
            'summary': req.body.summary,
            'desc': req.body.desc,
            'updated_at': new Date(),
            'updated_type': 'basicInfo'
        },
        finalRes = {};

    async.auto({
        updateBug: function (cb) {
            bug.bugUpdate(data, function (res) {
                console.log('[U3D] Controllers - bug update');
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

exports.updateStatus = function (req, res) {
    var data = {
            'id': req.body.id,
            'owner_id': req.body.owner_id,
            'owner_name': req.body.owner_name,
            'status': req.body.status,
            'updated_at': new Date(),
            'updated_type': 'status'
        },
        finalRes = {};

    async.auto({
        updateBugStatus: function (cb) {
            bug.bugUpdate(data, function (res) {
                console.log('[U3D] Controllers - bug updateStatus');
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};


