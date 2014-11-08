var router = function(app) {
  app.get('/', function (req, res) {
    res.send('hello world');
  });

  app.get('/api/pedometer/:coinbase_id:', null);
  app.post('/api/pedometer/:coinbase_id:', null);

};

module.exports = router;
