const router = require("express").Router();
const passport = require("passport");

// auth with google+ for JobSeeker
router.get(
  "/google",
  passport.authenticate("googleJobseeker", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to for jobseeker
router.get(
  "/google/redirect",
  passport.authenticate("googleJobseeker"),
  (req, res) => {
    res.json(req.user);
    res.send("you reached the redirect user URI");
  }
);

// auth with google for employer
router.get(
  "/googleEmployer",
  passport.authenticate("googleEmployer", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to for employer
router.get(
  "/googleEmployer/redirect",
  passport.authenticate("googleEmployer"),
  (req, res) => {
    // res.json(req.user);
    res.send("you reached the redirect employee URI");
  }
);

module.exports = router;
