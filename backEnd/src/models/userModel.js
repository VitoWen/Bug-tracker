var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    userSchema = new mongoose.Schema({
        'id': String,
        'name': String,
        'pwd': String,
        'type': String,
        'department': String,
        'title': String,
        'created_at': {type: Date, default: Date.now},
        'updated_at': {type: Date, default: Date.now}
    });

userSchema.methods.userCreate = function (data, cb) {
    var conditions = {
            'id': uuid.v4(),
            'name': data.name,
            'pwd': data.pwd,
            'type': data.type,
            'department': data.department,
            'title': data.title,
        },
        result = {
            'success': true,
            'res': null
        };

    userModel.create(conditions, function (err, res) {
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
}

userSchema.methods.userFind = function (data, cb) {
    var conditions = {
            'name': data.name,
            'pwd': data.pwd
        },
        result = {
            'success': true,
            'res': null
        };

    userModel.find(conditions).exec(function (err, res) {
        if (err || !res.length) {
            result.success = false;
        }

        result.res = res;

        cb(result);
    });
};

userSchema.methods.userFindById = function (data, cb) {
    var conditions = {
            'id': data.id
        };

    userModel.find(conditions).exec(function (err, res) {
        if (err || !res.length) {
            console.log('[U3D] get userFindById fail. err:', err);
        }

        cb(res[0]);
    });
};

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;