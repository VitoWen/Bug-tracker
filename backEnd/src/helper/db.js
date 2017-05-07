var mongoose = require('mongoose'),

exports.connect = function (callback) {
  mongoose.connect(callback);
};