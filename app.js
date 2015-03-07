// initial "imports"
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// mongoDB stuff: Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sandbox');

// defining routes -> direct traffic
var rootRoute = require('./routes/index');
var usersRoute = require('./routes/users');

// define app as a variable to hold express module
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
* If path part of the URL is '/', node will use the route "routes"
* to direct all sub-pages, if it is /users, it will use "users"
* Eg.: http://localhost:3000/ -> use routes
*      http://localhost:3000/users -> use users
*      http://localhost:3000/hue -> use routes
*      http://localhost:3000/users/hue -> use users
*/
app.use('/', rootRoute);
app.use('/users', usersRoute);


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


module.exports = app;
