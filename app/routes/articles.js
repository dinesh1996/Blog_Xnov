"use strict";


const express = require('express');
const router = express.Router();
const articles = require('../controllers/Articles');


router.get('/',   articles.index );



router.get('/create', function (req,res,next) {
	res.render('articles/NewArticleCreate')

});

router.post('/create',  articles.create);

router.get('/update/:id', articles.preupdate);

router.put('/update/:id',  articles.update);





router.get('/delete/:id', articles.predelete);


router.delete('/delete/:id', articles.delete);



router.get('/read',function(req,res){
	res.send('Fonction retournant article');
});

module.exports = router;

