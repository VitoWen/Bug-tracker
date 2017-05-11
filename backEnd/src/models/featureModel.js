var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    featureSchema = new mongoose.Schema({
        'id': String,
        'status': {type: String, default: 'Unsolved'},
        'reporter_id': String,
        'reporter_name': String,
        'owner_id': {type: String, default: ''},
        'owner_name': {type: String, default: ''},
        'purpose': String,
        'desc': String,
        'created_at': {type: Date, default: Date.now},
        'updated_at': {type: Date, default: Date.now}
    });

featureSchema.methods.featureCreate = function (data, cb) {
    var conditions = {
            'id': uuid.v4(),
            'reporter_id': data.reporter_id,
            'reporter_name': data.reporter_name,
            'purpose': data.purpose,
            'desc': data.desc,
        },
        result = {
            'success': true,
            'res': null
        };

    featureModel.create(conditions, function (err, res) {
        console.log('[U3D] Models - featureCreate');
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
};

featureSchema.methods.featureDelete = function (data, cb) {
    var conditions = {
            'id': data.id
        },
        result = {
            'success': true,
            'res': null
        };

    featureModel.remove(conditions, function (err, res) {
        console.log('[U3D] Models - featureDelete');
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
};

featureSchema.methods.featureUpdate = function (data, cb) {
    var conditions = {
            'id': data.id
        },
        update = {},
        opts = {
            new: true
        },
        result = {
            'success': true,
            'res': null
        };

    if (data.updated_type === 'basicInfo') {
        update = {
            'purpose': data.purpose,
            'desc': data.desc,
            'updated_at': data.updated_at
        };
    } else if (data.updated_type === 'status') {
        update = {
            'owner_id': data.owner_id,
            'owner_name': data.owner_name,
            'status': data.status,
            'updated_at': data.updated_at
        };
    }

    featureModel.findOneAndUpdate(conditions, update, opts)
    .exec(function (err, res) {
        console.log('[U3D] Models - featureUpdate');
        if (err) {
            result.success = false;
        }
        result.res = res;

        cb(result);
    });
};

featureSchema.methods.featureFind = function (data, cb) {
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

    featureModel.find(conditions).exec(function (err, res) {
        console.log('[U3D] Models - featureFind');
        if (err || !res.length) {
            result.success = false;
        }

        result.res = res;

        cb(result);
    });
};

var featureModel = mongoose.model('feature', featureSchema);
module.exports = featureModel;