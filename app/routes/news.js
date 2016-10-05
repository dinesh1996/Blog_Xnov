"use strict";
const express = require('express');
const router = express.Router();

const news = require('../controllers/News.js');

//Création d'un article
router.post('/create',news.create);

//Destruction de l'article
router.delete('/unactive',news.delete);

//Modification de l'article
router.put('/update',news.update);

//Affiche la liste des articles
router.get('/all',news.getAll);

//Affiche l'article sélectionné
router.get('/read',news.read);

module.exports = router;

