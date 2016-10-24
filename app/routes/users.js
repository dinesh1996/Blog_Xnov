"use strict";
const express = require('express');
const router = express.Router();
const users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

//Post
router.post('/create',  users.create);
router.post('/login', users.logIn);
router.post('/signup', function(req, res, next){
  res.send('respond with a ressource');
});
router.post('/login', function(req, res, next){
  res.send('respond with a ressource');
});
router.post('/login/forgot', function(req, res, next){
  res.send('respond with a ressource');
});
router.post('/login', function(req, res, next){
  res.send('respond with a ressource');
});
router.post('/login/forgot', function(req, res, next){
  res.send('respond with a ressource');
});

router.get('/logout',users.logOut);

//Put
router.put('/update/:id',  users.update);

//GET
router.get('/',users.index );
router.get('/create', function (req,res,next) {
  res.render('users/NewUserCreate')
});
router.get('/update/:id', users.preupdate);
router.get('/delete/:id', users.predelete);
router.get('/profil',users.getProfil);

//Delete
router.delete('/delete/:id', users.delete);

module.exports = router;
