'use strict';

var socketRoutes = function (socket) {
  console.log('[Socket] Someone connected to socket');

  socket.on('pedometer', function (data) {
    console.log('[pedometer]', data);
  });

  socket.on('disconnect', function () {
    console.log('[Socket] User disconnected from socket');
  });
};

var router = function(app, io) {

  io.on('connection', socketRoutes);

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  app.get('/api/pedometer/:coinbase_id:');
  app.post('/api/pedometer/:coinbase_id:');

};

module.exports = router;
