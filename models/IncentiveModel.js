'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird');

// Schema and Model
var schema = mongoose.Schema({
  coinbase_id: String,
  amount: Number,
  expire_date: String,
  create_date: String,
  goal: Number,
  verified: Boolean
});

var getModel = function () {
  var IncentiveModel;
  try {
    IncentiveModel = mongoose.model('incentives', schema);
  } catch (e) {
    IncentiveModel = mongoose.model('incentives');
  }

  IncentiveModel = Promise.promisifyAll(IncentiveModel);
  return IncentiveModel;
};

module.exports = getModel();
