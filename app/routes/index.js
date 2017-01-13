"use strict";
const express = require('express');
const router = express.Router();

const users = require('../controllers/Users.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Xnov Blog' });
});

router.get('/login',users.getLogin);

//Post
router.post('/signup',users.create);


module.exports = router;
