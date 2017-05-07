var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    bugSchema = new mongoose.Schema({
        'id': String,
        'reporter_id': String,
        'reporter_name': String,
        'owner_id': {type: String, default: ''},
        'owner_name': {type: String, default: ''},
        'severity': String,
        'priority': String,
        'summary': String,
        'desc': String,
        'created_at': {type: Date, default: Date.now},
        'updated_at': {type: Date, default: Date.now}
    });

bugSchema.methods.bugCreate = function (data, cb) {
    var conditions = {
            'id': uuid.v4(),
            'reporter_id': data.reporter_id,
            'reporter_name': data.reporter_name,
            'severity': data.severity,
            'priority': data.priority,
            'summary': data.summary,
            'desc': data.desc,
        },
        result = {
            'success': true,
            'res': null
        };

    bugModel.create(conditions, function (err, res) {
        console.log('[U3D] Models - bugCreate');
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
}

bugSchema.methods.bugDelete = function (data, cb) {
    var conditions = {
            'id': data.id
        },
        result = {
            'success': true,
            'res': null
        };

    bugModel.remove(conditions, function (err, res) {
        console.log('[U3D] Models - bugDelete');
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
}

bugSchema.methods.bugUpdate = function (data, cb) {
    var conditions = {
            'id': data.id,
            'reporter_id': data.reporter_id,
            'severity': data.severity,
            'priority': data.priority,
            'summary': data.summary,
            'desc': data.desc
        },
        result = {
            'success': true,
            'res': null
        };

    bugModel.create(conditions, function (err, res) {
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
}

bugSchema.methods.bugFind = function (data, cb) {
    var conditions = {}, // Default get all
        result = {
            'success': true,
            'res': null
        };

    if (data.reporter_id.length) {
        conditions.reporter_id = data.reporter_id;
    } else if (data.owner_id.length) {
        conditions.owner_id = data.owner_id;
    }

    bugModel.find(conditions).exec(function (err, res) {
        console.log('[U3D] Models - bugFind');
        if (err || !res.length) {
            result.success = false;
        }

        result.res = res;

        cb(result);
    });
};

var bugModel = mongoose.model('bug', bugSchema);
module.exports = bugModel;