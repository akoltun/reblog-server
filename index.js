var express = require('express');
var application = express();

var cors = require('cors');
var items = require('./data').items;

application.use(cors());

application.get('/', function(req, res) {
  setTimeout(() => res.json(items), 1000);
});

application.get('/posts/:id', function(req, res) {
  var id = req.params.id;
  setTimeout(() => res.json(items[id]), 1000);
});

application.post('/posts/:id/like', function(res, req) {
  var id = req.params.id;
  items[id].meta.likes = items[id].meta.likes + 1;
  setTimeout(() => res.json(items[id]), 1000);
});

application.listen(3002, function() {
  console.log('Server is listening 3002');
});
