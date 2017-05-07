var sugar = require('sugar'),
    url = require("url"),
    async = require("async"),
    userModel = require('../models/userModel.js'),
    user = new userModel();

exports.create = function (req, res) {
    var data = {
            'name': req.body.name,
            'pwd': req.body.pwd,
            'type': req.body.type,
            'department': req.body.department,
            'title': req.body.title
        },
        finalRes = {};

    async.auto({
        createUser: function (cb) {
            user.userCreate(data, function (res) {
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

exports.login = function (req, res) {
    var data = {
        'name': req.body.name,
        'pwd': req.body.pwd
    };

    async.auto({
        getUser: function (cb) {
            user.userFind(data, function (res) {
                finalRes = res;
                cb();
            });
        }
    }, function final() {
        res.json(finalRes);
    });
};

