var express = require('express');
var application = express();

var morgan = require('morgan');
application.use(morgan('dev'));

var cors = require('cors');
var items = require('./data').items;

application.use(cors());

const defaultDelay = 2000;
const delayResponse = (response, delay = defaultDelay) =>
  setTimeout(response, delay);

const validateId = id => 0 <= id && id < items.length;

application.get('/', function(req, res) {
  delayResponse(() => res.json(items));
});

application.get('/posts/:id', function(req, res) {
  var id = req.params.id - 1;

  if (!validateId(id)) return delayResponse(() => res.sendStatus(404));;

  delayResponse(() => res.json(items[id]));
});

application.post('/posts/:id/like', function(req, res) {
  var id = req.params.id - 1;

  if (!validateId(id)) return delayResponse(() => res.sendStatus(404));;

  items[id].meta.likes.count = items[id].meta.likes.count + 1;
  delayResponse(() => res.json(items[id]));
});

application.listen(3002, function() {
  console.log('Server is listening 3002');
});
