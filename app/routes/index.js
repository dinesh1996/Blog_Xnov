"use strict";
const express = require('express');
const router = express.Router();

const users = require('../controllers/Users.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Xnov Blog' });
});


router.get('/signup', function(req, res, next){
  res.send('respond with a ressource');
});

router.get('/login',users.getLogin);

router.get('/login/forgot', function(req, res, next){
  res.send('respond with a ressource');
});

//Post
router.post('/signup',users.create);

router.post('/login/forgot', function(req, res, next){
  res.send('respond with a ressource');
});

module.exports = router;
