'use strict';

var IncentiveModel = require('../models/IncentiveModel.js');

var get = function (req, resp) {
  var coinbase_id = req.params('coinbase_id');

  console.log('IncentiveController [get] id:', coinbase_id);
};

var create = function (req, resp) {
  var data = req.body;
  var coinbase_id = req.params.coinbase_id;

  console.log('IncentiveController [create] id:', coinbase_id, 'data:', data);

  return IncentiveModel.createAsync({
    coinbase_id: coinbase_id,
    amount: data.amount,
    expire_date: data.expire_date,
    create_date: data.create_date,
    goal: data.goal
  }).then(function (incentive) {
    console.log('Created incentive:', incentive);
    resp.json(incentive);
  }).catch(function (e) {
    console.error('Failed to create incentive:', e);
    resp.json(e);
  });
};

module.exports = {
  get: get,
  create: create,
};
