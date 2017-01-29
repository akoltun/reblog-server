var express = require('express');
var application = express();

var cors = require('cors');
var items = require('./data').items;

application.use(cors());

application.get('/', function(req, res) {
  res.json(items);
});

application.listen(3002, function() {
  console.log('Server is listening 3002');
});