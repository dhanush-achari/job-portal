const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const engine = require("ejs-mate");
const passport = require("passport");
const favicon = require("serve-favicon");
const LocalStrategyemployer = require("passport-local").Strategy;
const LocalStrategystudent = require("passport-local").Strategy;
const seed = require("./seed");

const authRoutes = require("./routes/auth");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
// seed();

// user models
const Jobseeker = require("./models/jobseeker");
const Employer = require("./models/employer");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const jobrouter = require("./routes/job");

const app = express();

// connecting databses
var url = process.env.DATABASE_URL || "mongodb://localhost:27017/job-portal";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "conncetion error"));
db.once("open", function () {
  console.log("connected");
});

// use ejs-locals/mate for all the ejs template
app.engine("ejs", engine);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodoverride("_method"));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport configuration
app.use(
  session({
    secret: "This can be anyting",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategyemployer(Employer.authenticate()));
passport.use(new LocalStrategystudent(Jobseeker.authenticate()));

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

passport.serializeUser(function (userObject, done) {
  // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
  // it has prototype of either of the models
  let userGroup = "model1";
  let userPrototype = Object.getPrototypeOf(userObject);
  // console.log(userPrototype)
  if (userPrototype === Jobseeker.prototype) {
    userGroup = "model1";
  } else if (userPrototype === Employer.prototype) {
    userGroup = "model2";
  }
  let sessionConstructor = new SessionConstructor(userObject.id, userGroup, "");
  done(null, sessionConstructor);
});

passport.deserializeUser(function (sessionConstructor, done) {
  if (sessionConstructor.userGroup == "model1") {
    Jobseeker.findOne(
      {
        _id: sessionConstructor.userId,
      },
      "-localStrategy.password",
      function (err, user) {
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      }
    );
  } else if (sessionConstructor.userGroup == "model2") {
    Employer.findOne(
      {
        _id: sessionConstructor.userId,
      },
      "-localStrategy.password",
      function (err, user) {
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      }
    );
  }
});

//middleware / local variable this should come before any route you render
app.use(function (req, res, next) {
  // app.locals.moment = require('moment');
  res.locals.currentUser = req.user;
  res.locals.success = req.session.success || "";
  delete req.session.success;
  res.locals.error = req.session.error || "";
  delete req.session.error;
  next();
});

app.use("/", indexRouter);
app.use("/jobs", jobrouter);
app.use("/user", usersRouter);
app.use("/auth", authRoutes);
// app.use('/employer')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
