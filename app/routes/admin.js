/**
 * Created by Julien on 05/10/2016.
 */
const express = require('express');
const router = express.Router();
const articles = require('../controllers/Articles');
const users = require('../controllers/Users');
const categories = require('../controllers/Categories');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('respond with a ressource ');
});

router.get('/users', function (req,res, next) {
    res.send('respond with a ressource');
});

router.get('/users/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.post('/users/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.delete('/users/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.get('/news', function (req,res, next) {
    res.send('respond with a ressource');
});

router.get('/news/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.post('/news/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.delete('/news/id', function (req,res, next) {
    res.send('respond with a ressource');
});






router.get('/categories', categories.index);

router.get('/categories/create', function (req,res, next) {
    res.render('categories/NewCategoryCreate');
});

router.post('/categories/create',  categories.create);

router.get('/categories/update/:id', categories.preupdate);
router.put('/categories/update/:id', categories.update);


router.get('/categories/delete/:id', categories.predelete);
router.delete('/categories/delete/:id', categories.delete);



module.exports = router;




