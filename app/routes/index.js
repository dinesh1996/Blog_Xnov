var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req,res,next){
  res.render('index', { title: 'Express'})
});


router.get('/signup', function(req, res, next){
  res.send('respond with a ressource');
});

router.get('/login', function(req, res, next){
  res.send('respond with a ressource');
});

router.get('/login/forgot', function(req, res, next){
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
