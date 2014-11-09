'use strict';

var PedometerController = require('./controllers/PedometerController.js');
var IncentiveController = require('./controllers/IncentiveController.js');
var OauthController = require('./controllers/OauthController.js');

var socketRoutes = function (socket) {
  console.log('[Socket] Someone connected to socket');

  socket.on('pedometer', PedometerController.add);

  socket.on('disconnect', function () {
    console.log('[Socket] User disconnected from socket');
  });
};

var router = function(app, io) {

  io.on('connection', socketRoutes);

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  app.get('/api/incentive/:coinbase_id:', IncentiveController.get);
  app.post('/api/incentive/:coinbase_id:', IncentiveController.create);

  app.get('/api/pedometer/:coinbase_id:', PedometerController.get);
  
  app.post('/oauth', OauthController.getAccessToken);

};

module.exports = router;
