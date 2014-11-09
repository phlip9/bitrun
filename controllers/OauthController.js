'use strict';

var request = require('request-promise');

var getAccessToken = function (req, resp) {
  console.log('OauthController [getAccessToken]', req.body);
  return request({ url: req.body, json: true, method: 'POST' })
    .then(function (res) {
      console.log('OauthController got access_token!', JSON.stringify(res));
      resp.json(res);
    }).catch(function (e) {
      console.error('Error getting access token:', e.message);
      resp.json({
        error: 'Error getting access token'
      });
    });
};

module.exports = {
  getAccessToken: getAccessToken,
};
