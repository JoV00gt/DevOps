var express = require('express');
var router = express.Router();


const client = require('prom-client');
const gauge = new client.Gauge({name: 'number_of_clients', help: 'number of clients on the index page has gone upS'})

/* GET home page. */
router.get('/', function(req, res) {
  gauge.inc(1)
  res.render('index', { title: 'Express E' });
});

module.exports = router;
