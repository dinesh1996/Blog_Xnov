"use strict";
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); //used to manipulate POST
const connect = require('connect');
const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo')(session);


const routes = require('./app/routes/index');
const users = require('./app/routes/users');
const articles = require('./app/routes/articles');
const admin = require('./app/routes/admin');


const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 8600 * 7 },
  store: new MongoStore({url: 'mongodb://localhost/Xnov',
   //ttl: 14 * 24 * 60 * 60,
}),
 // autoRemove: 'native'
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Xnov', function (err) {
    if (err) {
        throw err;
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//Server mongoose
/*
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Xnov', function(err) {
		if (err) { throw err;  }
		});
*/

module.exports = app;
