const Employer = require("../models/employer");
const Jobseeker = require("../models/jobseeker")
const util = require("util")
const passport = require("passport");
module.exports={
    async Empregister(req,res,next){
        // console.log(req.body);
        const{username,email} = req.body;
        if(req.body.password.length<6)
        {
            error = "Password must be 6 digit long";
            return res.render("employer-register",{error,username,email})
        }
        if(req.body.password != req.body.passwordConfirmation)
        {
            error = "Password dont Match";
            return res.render("employer-register",{error,username,email})
        }
        let user = await Employer.findOne({$or:[{username},{email}]});
        if(user && user.email == email)
        {
            error = "Employer with given Email already exists";
            return res.render("employer-register",{error,username})
        }
         if(user && user.username == username)
         {
             error = "Employer with given username already exists";
             return res.render("employer-register",{error,email})
         }
         user = await Jobseeker.findOne({email});
         if(user)
         {
             error = "User is Already registered as student"
             return res.render("employer-register",{error})
         }
         let emp = await Employer.register(new Employer(req.body),req.body.password);
        //  console.log(emp);
         req.login(emp,async(err)=>{
            if(err) return next(err);
            req.session.success = "Logged in";
            res.redirect("/");
         })

    },
    async studentregister(req,res,next){
        // console.log(req.body,"reqbidy")
        const{username,email} = req.body;
        if(req.body.password.length<6)
        {
            error = "Password must be 6 digit long";
            return res.render("candidate-register",{error,username,email})
        }
        if(req.body.password != req.body.passwordConfirmation)
        {
            error = "Password dont Match";
            return res.render("candidate-register",{error,username,email})
        }
        let user = await Jobseeker.findOne({$or:[{username},{email}]});
        if(user && user.email == email)
        {
            error = "Student with given Email already Registered";
            return res.render("candidate-register",{error,username})
        }
         if(user && user.username == username)
         {
             error = "Student with given username already exists";
             return res.render("candidate-register",{error,email})
         }
         user = await Employer.findOne({email});
         if(user)
         {
             error = " The given Email is Already registered as a Employer"
             return res.render("candidate-register",{error})
         }
         let emp = await Jobseeker.register(new Jobseeker(req.body),req.body.password);
        //  console.log(emp);
         req.login(emp,async(err)=>{
            if(err) return next(err);
            req.session.success = "Logged in";
            res.redirect("/")

         })

    },
    async StudentLogin(req,res,next){
        const {email,password} = req.body;
        // if(!user&&error) return next(error);
        try{
            const{user,error}  = await Jobseeker.authenticate()(email,password);
            if(error)throw error
            const login =  util.promisify(req.login.bind(req));
            await login(user);
            
            // req.session.success = `Welcome back ${user.username}`;
            // const redirecturl = req.session.redirectTo || "/post";
            // delete req.session.redirectTo;
            res.redirect("/");

        }catch(err){
            let user = await Jobseeker.findOne({email:req.body.email});
            if(!user) 
            req.session.error = "The given email is not registered Please register and Log in";
            // else if(user.googleId)
            // req.session.error = "You Previously signed up with Google ";
            else 
            req.session.error = "Email or Password is incorrect"
            res.redirect("/login/student")

        }
    },
    async EmployerLogin(req,res,next)
    {   
        const {email,password} = req.body;
        try{
            const{user,error}  = await Employer.authenticate()(email,password);
            console.log(user,"employer")
            if(error)throw error
            const login =  util.promisify(req.login.bind(req));
            await login(user);
            
            // req.session.success = `Welcome back ${user.username}`;
            // const redirecturl = req.session.redirectTo || "/post";
            // delete req.session.redirectTo;
            res.redirect("/");

        }catch(err){
            let user = await Employer.findOne({email:req.body.email});
            if(!user) 
            req.session.error = "The given email is not registered Please register and Log in";
            // else if(user.googleId)
            // req.session.error = "You Previously signed up with Google ";
            else 
            req.session.error = "Email or Password is incorrect"
            res.redirect("/login/employer")

        }

       
    }
}