const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const Jobseeker = require("../models/jobseeker");

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    Jobseeker.findById(id).then((user)=>{
        done(null,user)
    })
    
})

//google startegy setup for jobSeeker
passport.use(
  "googleJobseeker",
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("CALL BACK");


      Jobseeker.findOne(
        { email: profile.emails[0].value },
        (err, jobseeker) => {
          if (!jobseeker) {
            new Jobseeker({
              username: profile.displayName,
              email: profile.emails[0].value,
            }).save((err, user) => {
              if (err) {
                console.log("error:Creating new jobseeker profile failed");
              }
              console.log("New user created",user);
              done(null,user)
            });
          } else {
            console.log("User already Exists:",jobseeker);
            done(null,jobseeker);
          }
        }
      );
    }
  )
);
