'use strict';

var PedometerModel = require('../models/PedometerModel.js');

var get = function (req, resp) {
  var coinbase_id = req.params('coinbase_id');

  console.log('PedometerController [get] id:', coinbase_id);
};

var add = function (data) {
  console.log('PedometerController [add]', data);
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
  get: get,
  add: add,
};
