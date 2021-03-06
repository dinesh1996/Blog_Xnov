/**
 * Created by Julien on 05/10/2016.
 */
const express = require('express');
const router = express.Router();
const articles = require('../controllers/Articles');
const users = require('../controllers/Users');
const categories = require('../controllers/Categories');



/*
route.route('/users/id')
    .get(function (req,res, next) {
        res.send('respond with a ressource');
    })
    .post(function (req,res, next) {
        res.send('respond with a ressource');
    })
    .put(function (req,res, next) {
        res.send('respond with a ressource');
    });
*/
//GET
router.get('/categories', categories.index);
router.get('/categories/create', function (req,res, next) {
    res.render('categories/NewCategoryCreate');
});
router.get('/categories/update/:id', categories.preupdate);
router.get('/categories/delete/:id', categories.predelete);
router.get('/categories/read/:id', categories.read);
router.get('/', function(req, res, next) {
    res.send('respond with a ressource ');
});

router.get('/users', function (req,res, next) {
    res.send('respond with a ressource');
});

router.get('/users/id', function (req,res, next) {
    res.send('respond with a ressource');
});
router.get('/news', function (req,res, next) {
    res.send('respond with a ressource');
});

router.get('/news/id', function (req,res, next) {
    res.send('respond with a ressource');
});

//post
router.post('/categories/create',  categories.create);
router.post('/categories/reactive/:id', categories.reactive);
router.post('/news/id', function (req,res, next) {
    res.send('respond with a ressource');
});
router.post('/users/id', function (req,res, next) {
    res.send('respond with a ressource');
});

//put
router.put('/categories/update/:id', categories.update);
//Delete
router.delete('/news/id', function (req,res, next) {
    res.send('respond with a ressource');
});
router.delete('/users/id', function (req,res, next) {
    res.send('respond with a ressource');
});
router.delete('/categories/delete/:id', categories.delete);


/* GET home page. */


module.exports = router;
