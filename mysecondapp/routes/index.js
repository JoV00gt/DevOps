var express = require('express');
var router = express.Router();
const { db } = require("../services/database");
require('../pubsub/consumer.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/welcome', async function(req, res) {
  let users = await db.collection('users').find().toArray();
  res.send("Welcome we know that there are: " + users.length + " users");
});

module.exports = router;
