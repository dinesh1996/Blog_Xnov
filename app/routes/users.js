"use strict";
const express = require('express');
const router = express.Router();
const users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement
const comment = require('../controllers/Comments'); // Nous allons récuperer notre controlleur fait précédement

//Routes en methode get
router.get('/create',users.getSignUp);
router.get('/', users.index);

//Accès page Création utilisateur
//Accès page Modification données utilisateur
router.get('/update/', users.preupdate);
//Accès page confirmation "suppression" utilisateur connecté
router.get('/delete/:id', users.predelete);
//Accès page post de commentaires
router.get('/article/:id', comment.getNewCommentCreate);
//Accès page liste de tous les commentaires
router.get('/articles/allcomments', comment.index);
//Accès page de profil
router.get('/profil', users.getProfil);
//Logout l'utilisateur
router.get('/logout', users.logOut);


router.get('/login', users.getLogin);
router.get('/signup', users.getSignUp);

//Routes en methode delete

//Rend inactif le compte de l'utilisateur
router.delete('/delete/:id', users.delete);

//Routes en methode PUT
router.put('/update/',users.update);
router.get('/promote/:id',users.promoteUserAdmin);
router.get('/demote/:id',users.demoteAdmin);
////Routes en methode Post
router.post('/login', users.logIn);
router.post('/signup', users.create);
router.post('/article/:id', comment.create);
router.post('/login/forgot', function (req, res, next) {
    res.send('respond with a ressource');
});

module.exports = router;
