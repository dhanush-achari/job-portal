const Employer = require("../models/employer");
const Jobseeker = require("../models/jobseeker")



module.exports={
    async Empregister(req,res,next){
        console.log(req.body);
        const{username,email} = req.body;
        if(req.body.password.length<6)
        {
            error = "Password must be 6 digit long";
            return res.render("employer-register",{error,username,email,fullname})
        }
        if(req.body.password != req.body.passwordConfirmation)
        {
            error = "Password dont Match";
            return res.render("employer-register",{error,username,email,fullname})
        }
        let user = await Employer.findOne({$or:[{username},{email}]});
        if(user && user.email == email)
        {
            error = "Employer with given Email already exists";
            return res.render("employer-register",{error,username,fullname})
        }
         if(user && user.username == username)
         {
             error = "Employer with given username already exists";
             return res.render("employer-register",{error,email,fullname})
         }
         user = await Jobseeker.findOne({email});
         if(user)
         {
             error = "User is Already registered as student"
             return res.render("employer-register",{error,fullname})
         }
         let emp = await Employer.register(new Employer(req.body),req.body.password);
         console.log(emp);
         req.login(emp,async(err)=>{
            if(err) return next(err);
            req.session.success = "Logged in";
            console.log(req.user,"in controllers")
            res.send("Registered");

         })

    },
    async studentregister(req,res,next){
        console.log(req.body)
        const{username,email} = req.body;
        if(req.body.password.length<6)
        {
            error = "Password must be 6 digit long";
            return res.render("candidate-register",{error,username,email,fullname})
        }
        if(req.body.password != req.body.passwordConfirmation)
        {
            error = "Password dont Match";
            return res.render("candidate-register",{error,username,email,fullname})
        }
        let user = await Jobseeker.findOne({$or:[{username},{email}]});
        if(user && user.email == email)
        {
            error = "Student with given Email already Registered";
            return res.render("candidate-register",{error,username,fullname})
        }
         if(user && user.username == username)
         {
             error = "Student with given username already exists";
             return res.render("candidate-register",{error,email,fullname})
         }
         user = await Employer.findOne({email});
         if(user)
         {
             error = " The given Email is Already registered as a Employer"
             return res.render("candidate-register",{error,fullname})
         }
         let emp = await Jobseeker.register(new Jobseeker(req.body),req.body.password);
        //  console.log(emp);
         req.login(emp,async(err)=>{
            if(err) return next(err);
            req.session.success = "Logged in";
            // console.log(req.user,"in controllers")
            res.send("Registered");

         })

    }
}