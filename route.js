'use strict';

var router = function(app) {

  app.io.route('pedometer-socket', function (data) {
    console.log('[pedometer]', JSON.stringify(data));
  });

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  app.get('/api/pedometer/:coinbase_id:');
  app.post('/api/pedometer/:coinbase_id:');

};

module.exports = router;
