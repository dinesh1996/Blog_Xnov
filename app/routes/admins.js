/**
 * Created by Julien on 05/10/2016.
 */
var express = require('express');
var router = express.Router();

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

router.get('/categories', function (req,res, next) {
    res.send('respond with a ressource');
});

router.get('/categories/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.post('/categories/id', function (req,res, next) {
    res.send('respond with a ressource');
});

router.delete('/categories/id', function (req,res, next) {
    res.send('respond with a ressource');
});


module.exports = router;

