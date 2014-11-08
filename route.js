'use strict';

var router = function(app) {

  app.io.route('pedometer', {
    push: function (data) {
      console.log('[pedometer:push]', data);
    }
  });

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  app.get('/api/pedometer/:coinbase_id:');
  app.post('/api/pedometer/:coinbase_id:');

};

module.exports = router;
