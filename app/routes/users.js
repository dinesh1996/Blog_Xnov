
"use strict";


const express = require('express');
const router = express.Router();
const users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement
/* GET users listing. */
router.get('/',   users.index );



router.get('/create', function (req,res,next) {
  res.render('users/NewUserCreate')

});

router.post('/create',  users.create);

router.get('/update/:id', users.preupdate);

router.put('/update/:id',  users.update);





router.get('/delete/:id', users.predelete);


router.delete('/delete/:id', users.delete);





















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
