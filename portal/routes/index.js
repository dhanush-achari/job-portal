const express = require('express');
const router = express.Router();
const {errorHandler} = require("../middleware/index")
const {Empregister,studentregister} = require("../controller/index")


/* GET Index page. */
router.get("/",(req,res,next)=>{
  res.render("index")
})

/* GET student login page. */
router.get('/login/student', function(req, res, next) {
  res.render('candidate-login');
});

/* GET Employee login page. */
router.get('/login/employer', function(req, res, next) {
  res.render('employer-login');
});

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
