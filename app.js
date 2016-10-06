<<<<<<< HEAD
"use strict";



const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); //used to manipulate POST

const routes = require('./app/routes/index');
const users = require('./app/routes/users');
const news = require('./app/routes/news');


let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Xnov', function(err) {
  if (err) { throw err; }
});


// view engine setup

app.set('views', path.join(__dirname, 'app/views'));

=======
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./app/routes/index');
var users = require('./app/routes/users');
var admins = require('./app/routes/admins');
var news = require('./app/routes/news');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
>>>>>>> a37cd126b2dee23a536012b42c450a2ae2e0bbcf
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/admins', admins);
app.use('/news',news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//Server mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Xnov', function(err) {
		  if (err) { throw err; }
		  });

module.exports = app;
