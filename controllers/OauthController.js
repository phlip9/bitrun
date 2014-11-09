'use strict';

var request = require('request-promise');
var PedometerModel = require('../models/PedometerModel.js');

var getAccessToken = function (req, resp) {
  console.log('OauthController [getAccessToken]', req.body);
  return request({ url: req.body, json: true, method: 'POST' })
    .then(function (res) {
      console.log('OauthController got access_token!', JSON.stringify(res));
      resp.json(res);
    });
};

module.exports = {
  getAccessToken: getAccessToken,
};
