'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird');

// Schema and Model
var schema = mongoose.Schema({
  coinbase_id: String,
  distance: Number,
  steps: Number,
  from: String,
  to: String
});

var getModel = function () {
  var PedometerModel;
  try {
    PedometerModel = mongoose.model('pedometers', schema);
  } catch (e) {
    PedometerModel = mongoose.model('pedometers');
  }

  PedometerModel = Promise.promisifyAll(PedometerModel);
  return PedometerModel;
};

module.exports = getModel();
