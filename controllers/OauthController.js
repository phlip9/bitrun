'use strict';

var request = require('request-promise');

var getAccessToken = function (req, resp) {
  console.log('OauthController [getAccessToken]', req.body);
  return request({ uri: req.body.uri, json: true, method: 'POST' })
    .then(function (res) {
      console.log('OauthController got access_token!', JSON.stringify(res));
      resp.json(res);
    }).catch(function (e) {
      console.error('Error getting access token:', e);
      resp.json(e);
    });
};

module.exports = {
  getAccessToken: getAccessToken,
};
