var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Connect to database (registers DB model)
const mongoDB = require("./models/dbModel");

var indexController = require('./controllers/index');
var loginController = require('./controllers/loginController');
var logoutController = require('./controllers/logoutController');
var signupController = require('./controllers/signupController');
var trackDisposalController = require('./controllers/trackDisposalController');
var recyclingPointController = require('./controllers/recyclingPointController');
var reportDisposalController = require('./controllers/reportDisposalController');
var manageAccountController = require('./controllers/manageAccountController');
var recyclingTipsController = require('./controllers/recyclingTipsController');
var recycleItemController = require('./controllers/recycleItemController');
var nofiticationController = require('./controllers/notificationController');

var app = express();

//Import express-session
const session = require("express-session");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session middleware
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
);

app.use('/', indexController);
app.use('/login', loginController);
app.use('/logout', logoutController);
app.use('/signup', signupController);
app.use('/trackdisposal', trackDisposalController);
app.use('/reportdisposal', reportDisposalController);
app.use('/recyclingpoint', recyclingPointController);
app.use('/manageaccount', manageAccountController);
app.use('/recyclingtips', recyclingTipsController);
app.use('/notification', nofiticationController);
app.use('/recycleitem', recycleItemController);
app.use(express.urlencoded({ extended: true }));


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
