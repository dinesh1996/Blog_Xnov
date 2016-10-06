"use strict";


const express = require('express');
const router = express.Router();

//Création d'un article
router.post('/create',function(req,res){
	res.send('Fonction create');
});

//Destruction de l'article
router.delete('/unactive',function(req,res){
	res.send('Fonction de désactivation');
});

//Modification de l'article
router.put('/update',function(req,res){
	res.send('Fonction update');
});

//Affiche la liste des articles
router.get('/all',function(req,res){
	res.send('Fonction retournant tous les articles');
});

//Affiche l'article sélectionné
router.get('/read',function(req,res){
	res.send('Fonction retournant article');
});

module.exports = router;

