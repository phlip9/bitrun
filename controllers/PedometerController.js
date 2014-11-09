'use strict';

var PedometerModel = require('../models/PedometerModel.js');
var IncentiveModel = require('../models/IncentiveModel.js');

var stepDataRollup = function (stepData) {
  var total_distance = 0;
  var i, l, datum;
  for (i = 0, l = stepData.length; i < l; i++) {
    datum = stepData[i];
    if (datum) {
      total_distance += datum.distance;
    }
  }

  return {
    total_distance: total_distance,
    data: stepData
  };
};

var get = function (req, resp) {
  var coinbase_id = req.params.coinbase_id;

  console.log('PedometerController [get] id:', coinbase_id);

  IncentiveModel.findOneAsync({
    coinbase_id: coinbase_id
  }).then(function (incentive) {
    console.log('PedometerController [get] incentive:', incentive);
    if (incentive) {
      var create_date = incentive.create_date;
      return PedometerModel.findAsync({ to: { $gt: create_date } });
    } else {
      throw new Error('No incentive for user');
    }
  }).then(stepDataRollup)
  .then(function (data) {
    resp.json(data);
  });
};

var add = function (data) {
  console.log('PedometerController [add]', data);
  return PedometerModel.createAsync({
    coinbase_id: data.coinbase_id,
    steps: data.steps,
    distance: data.distance,
    from: data.distance,
    to: data.distance
  }).then(function (result) {
    console.log('PedometerController [add] created new PedometerModel', result);
  }).catch(function (e) {
    console.error('Failed to add step data:', e);
  });
};

module.exports = {
  get: get,
  add: add,
};
