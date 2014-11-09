'use strict';

var PedometerController = require('./controllers/PedometerController.js');
var IncentiveController = require('./controllers/IncentiveController.js');
var OauthController = require('./controllers/OauthController.js');
var CoinbaseController = require('./controllers/CoinbaseController.js');

var socketRoutes = function (socket) {
  console.log('[Socket] Someone connected to socket');

  socket.on('pedometer', PedometerController.add);

  socket.on('disconnect', function () {
    console.log('[Socket] User disconnected from socket');
  });
};

var router = function(app, io) {

  io.on('connection', socketRoutes);

  app.get('/api/incentive/:coinbase_id?', IncentiveController.get);
  app.post('/api/incentive/:coinbase_id?', IncentiveController.create);

  app.get('/api/pedometer/:coinbase_id?', PedometerController.get);
  
  app.post('/oauth', OauthController.getAccessToken);

  app.post('/api/coinbase', CoinbaseController.forward);

};

module.exports = router;
