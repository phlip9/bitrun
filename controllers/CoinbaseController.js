'use strict';

var request = require('request');

var BASE_URL = 'https://api.coinbase.com/v1';

var forward = function (req, resp) {
  var options = req.body;

  var reqOpts = {};
  reqOpts.url = BASE_URL + options.url;
  reqOpts.method = options.method || 'GET';

  if (options.body) {
    reqOpts.body = options.body;
  }

  console.log('CoinbaseController [forward] options:', options);
  console.log('CoinbaseController [forward] reqOpts:', reqOpts);

  resp.set('Content-Type', 'application/json');

  request(reqOpts)
    .pipe(resp);
};

module.exports = {
  forward: forward
};
