var sugar = require('sugar'),
    url = require("url"),
    path = require("path"),
    async = require("async"),
    featureModel = require('../models/featureModel.js'),
    featureModel = new featureModel(),
    userModel = require('../models/userModel.js'),
    user = new userModel();

exports.listAll = function (req, res) {
    var featureModelData = {
            'reporter_id': '',
            'owner_id': ''
        },
        finalRes = {};

    async.series({
        getBugList: function (cb) {
            console.log('[U3D] Controllers - featureModel listAll');
            featureModel.featureFind(featureModelData, function (res) {
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
        featureModelData = {
            'reporter_id': '',
            'owner_id': ''
        },
        finalRes = {};

    async.series({
        userFindById: function (cb) {
            user.userFindById(userData, function (res) {
                if (res.type === 'pm') {
                    featureModelData.reporter_id = res.id;
                } else if (res.type === 'rd') {
                    featureModelData.owner_id = res.id;
                }
                cb();
            });
        },
        getBugList: function (cb) {
            console.log('[U3D] Controllers - featureModel list');
            featureModel.featureFind(featureModelData, function (res) {
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
            'purpose': req.body.purpose,
            'desc': req.body.desc,
        },
        finalRes = {};

    async.auto({
        createBug: function (cb) {
            console.log('[U3D] Controllers - featureModel create');
            featureModel.featureCreate(data, function (res) {
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
            console.log('[U3D] Controllers - featureModel delete');
            featureModel.featureDelete(data, function (res) {
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
            'purpose': req.body.purpose,
            'desc': req.body.desc,
            'updated_at': new Date(),
            'updated_type': 'basicInfo'
        },
        finalRes = {};

    async.auto({
        updateBug: function (cb) {
            featureModel.featureUpdate(data, function (res) {
                console.log('[U3D] Controllers - featureModel update');
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
            featureModel.featureUpdate(data, function (res) {
                console.log('[U3D] Controllers - featureModel updateStatus');
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};


