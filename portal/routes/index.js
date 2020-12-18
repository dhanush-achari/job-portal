const express = require('express');
const Job = require("../models/job")
const router = express.Router();
const {errorHandler,SearchFilter} = require("../middleware/index")
const {Empregister,studentregister,StudentLogin,EmployerLogin} = require("../controller/index")


/* GET Index page. */
router.get("/",SearchFilter,async (req,res,next)=>{
          console.log(req.user,"This is req.user")
          // const {dbquery} = res.locals;
          // delete res.locals.dbquery
          // console.log(dbquery)
          // const Jobs = await Job.find(dbquery)
          // res.send(Jobs)

          res.render("index")
})

/* GET student login page. */
router.get('/login/student', function(req, res, next) {
  res.render('candidate-login');
});

/* Post student login page. */
router.post("/login/student",errorHandler(StudentLogin))


/* GET Employee login page. */
router.get('/login/employer', function(req, res, next) {
  res.render('employer-login');
});

/* Post student login page. */
router.post("/login/employer",errorHandler(EmployerLogin))

/* GET student register page. */
router.get('/register/student', function(req, res, next) {
  res.render('candidate-register');
});

/* GET Employer register page. */
router.get('/register/employer', function(req, res, next) {
  res.render('employer-register');
});

/* Post employer register page. */
router.post("/register/employer",errorHandler(Empregister))

/* Post student Register page. */
router.post("/register/student",errorHandler(studentregister))

/* Get student resume page */

router.get('/student/resume', function(req, res, next) {
  res.render('candidate-register');
});












module.exports = router;
