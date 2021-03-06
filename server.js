var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Added
var passport = require('passport'); // Added
var methodOverride = require('method-override'); // Added

require('dotenv').config(); // Added
require('./config/database'); // Added
require('./config/passport'); // Added

var indexRouter = require('./routes/index');
var resortsRouter = require('./routes/resorts');
var reviewsRouter = require('./routes/reviews')
// var homeRouter = require('./routes/home');

// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Added

// Session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Make user available within every EJS template
app.use(function(req, res, next) {
  res.locals.user = req.user;
  console.log(res.locals.user)
  next();
  
});


app.use('/resorts', resortsRouter);
app.use('/', indexRouter);
app.use('/', reviewsRouter);


// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;