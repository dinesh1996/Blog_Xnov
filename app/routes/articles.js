"use strict";
const express = require('express');
const router = express.Router();
const articles = require('../controllers/Articles');
const categories = require('../controllers/Categories');


router.get('/',   articles.index );

router.get('/create', categories.getCategory);

router.post('/create',  articles.create);

router.get('/update/:id',  articles.preupdate);

router.put('/update/:id',  articles.update);



router.get('/delete/:id', articles.predelete);


router.delete('/delete/:id', articles.delete);

router.post('/reactive/:id', articles.reactive);


router.get('/read/:id', articles.read);



module.exports = router;
