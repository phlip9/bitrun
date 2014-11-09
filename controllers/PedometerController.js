'use strict';

var request = require('request-promise');
var PedometerModel = require('../models/PedometerModel.js');

var getStepData = function (coinbase_id, from, to) {

};

var addStepData = function (data) {
  return PedometerModel.createAsync({
    coinbase_id: data.coinbase_id,
    steps: data.steps,
    distance: data.distance,
    from: data.distance,
    to: data.distance
  }).catch(function (e) {
    console.error('Failed to add step data:', e.message);
  });
};

module.exports = {
  addStepData: addStepData,
};
