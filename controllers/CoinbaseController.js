'use strict';

var request = require('request');
var requestp = require('request-promise');

var IncentiveModel = require('../models/IncentiveModel.js');

var BASE_URL = 'https://api.coinbase.com/v1';
var API_KEY = process.env.COINBASE_API_KEY;
var SECRET_KEY = process.env.COINBASE_SECRET_KEY;

var coinbase = require('coinbase-api')({ api: API_KEY, secret: SECRET_KEY });

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

  // use vanilla requests here for pipe
  request(reqOpts)
    .pipe(resp);
};

var getAccessToken = function (req, resp) {
  console.log('CoinbaseController [getAccessToken]', req.body);
  return requestp({ uri: req.body.uri, json: true, method: 'POST' })
    .then(function (res) {
      console.log('OauthController got access_token!', JSON.stringify(res));
      resp.json(res);
    }).catch(function (e) {
      console.error('Error getting access token:', e);
      resp.json(e);
    });
};

var generateCheckout = function (req, resp) {
  var body = req.body;
  console.log('CoinbaseController [generateCheckout] body', body);

  var buttonOpts = {
    button: {
      name: 'BitRun Incentive Deposit',
      price_string: body.amount,
      price_currency_iso: body.currency || 'BTC',
      subscription: true,
      repeat: body.repeat || 'never',
      custom: body.coinbase_id
    }
  };

  console.log('CoinbaseController [generateCheckout] buttonOpts', buttonOpts);

  coinbase.buttons.create(buttonOpts, function (err, json) {
    if (!err && json && json.success) {
      var url = 'http://www.coinbase.com/checkouts/' + json.button.code;
      console.log('CoinbaseController [generateCheckout] err', err, 'json', json, 'link', url);
      resp.json({ url: url });
    } else {
      console.error('Error generating checkout link:', err, json);
    }
  });
};

var transactionCallback = function (req, resp) {
  var body = req.body;
  console.log('CoinbaseController [transactionCallback]', body);

  if (body.order.status === 'completed') {
    if (body.order.custom) {
      var coinbase_id = body.order.custom;

      IncentiveModel.findOneAndUpdateAsync({ coinbase_id: coinbase_id }, { verified: true })
        .then(function (ret) {
          console.log('Successfully updated IncentiveModel', ret);
        }).catch(function (err) {
          console.error('Error updating IncentiveModel', err);
        });
    }
  }
};

module.exports = {
  generateCheckout: generateCheckout,
  getAccessToken: getAccessToken,
  transactionCallback: transactionCallback,
  forward: forward
};
