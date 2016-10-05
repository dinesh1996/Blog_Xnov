var express = require('express');
var router = express.Router();
var users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement
/* GET users listing. */
router.get('/profil',   users.index );

router.post('/signup', function(req, res, next){
  res.send('respond with a ressource');
});

router.post('/login', function(req, res, next){
  res.send('respond with a ressource');
});

router.post('/login/forgot', function(req, res, next){
  res.send('respond with a ressource');
});





//Post
router.post('/signup', function(req, res, next){
  res.send('respond with a ressource');
});

router.post('/login', function(req, res, next){
  res.send('respond with a ressource');
});

router.post('/login/forgot', function(req, res, next){
  res.send('respond with a ressource');
});


module.exports = router;
