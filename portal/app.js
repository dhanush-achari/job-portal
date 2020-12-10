const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const engine  = require("ejs-mate");
const passport = require("passport");
const favicon = require('serve-favicon');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// connecting databses
var url = process.env.DATABASE_URL || 'mongodb://localhost:27017/job-portal';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false });
var db = mongoose.connection;
db.on('error',console.error.bind(console,"conncetion error"));
db.once('open',function(){
  console.log("connected")
})

// use ejs-locals/mate for all the ejs template
app.engine("ejs",engine);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodoverride("_method"))



// passport configuration
app.use(session({
  secret: "This can be anyting",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
// add create strategy and serialise and deserialise user after creating user model


//middleware / local variable this should come before any route you render
app.use(function(req,res,next){
  // app.locals.moment = require('moment');
  // res.locals.currentUser = req.user;
  res.locals.success = req.session.success || "";
  delete req.session.success;
  res.locals.error = req.session.error || "";
  delete req.session.error;
  next();
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
