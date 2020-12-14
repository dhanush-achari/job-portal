const Employer = require("../models/employer");
const Jobseeker = require("../models/jobseeker");
const experience = require("../models/experience");
const education = require("../models/education");
const project = require("../models/project");



module.exports = {

    async addDetails(req,res,next){
        let tempmodel ,body,ttemp;
        // console.log(req.body)
        const user = await Jobseeker.findById("5fd7a27c9337922d884bb21b");
       if(req.body.experience)
        {
            tempmodel = experience;
            body = req.body.experience;
            ttemp = user.experience
        }
        else if(req.body.education)
        {
            tempmodel = education;
            body = req.body.education;
            ttemp = user.education;
        }
        else 
        {
            tempmodel = project;
            body = req.body.project;
            ttemp = user.project;
        }
        var temp = new tempmodel(body);
        // await temp.save();
        ttemp.push(temp);
        await user.save();
        console.log(user)
        // res.redirect("/user/dashboard")
        res.send(user)

  },
   async  UpdateDetails(req,res,next){
    const user = await Jobseeker.findById("5fd7a27c9337922d884bb21b");
   if(req.body.experience)
    {   
        const {company,location,description} = req.body.experience  // start , end date add
        let temp = user.experience.find(doc=>doc._id.equals(req.params.id))
        temp.company = company;
        temp.location = location;
        temp.description = description;
    }
    else if(req.body.education)
    {
        const {institution,degree,description} = req.body.education    // start end date add
        let temp = user.education.find(doc=>doc._id.equals(req.params.id))
        temp.institution = institution;
        temp.degree = degree;
        temp.description = description;
    }
    else 
    {
        const {name,role,description,link} = req.body.project   // start end date add
        let temp = user.project.find(doc=>doc._id.equals(req.params.id))
        temp.name = name;
        temp.role = role;
        temp.link = link;
        temp.description = description;
    }
    await user.save();
    res.send(user)

  },

  async DeleteDetails(req,res,next){
      /* Find which model to delete
         loop through the respective array of the given model and match the _id === req.params.id 
         find the index and splice 1 from that index or givenmodel.array.pull({_id:req.parmas.id})
      */
     let temparray;
     let user = await Jobseeker.findById("5fd7a27c9337922d884bb21b");
     if(req.originalUrl.includes("/user/education"))
     {
         temparray = user.education;

     }else if(req.originalUrl.includes("/user/experience"))
     {
          temparray = user.experience;
     }else{
         temparray = user.project;
     }
     temparray.pull({_id:req.params.id})
     await user.save();
     console.log(user)
     res.send("ok")
      
   },
 async PersonalDetails(req,res,next){
/*
[{"key":"bio[fullname]","value":"yash raj","description":""},{"key":"bio[gender]","value":"male","description":""},{"key":"dob","value":"30 04 2000","description":""},{"key":"bio[nationality]","value":"indian","description":""},{"key":"bio[phone]","value":"7759858003","description":""},{"key":"bio[currentCompany]","value":"No","description":""},{"key":"bio[about]","value":"straight forward","description":""},{"key":"month","value":"04","description":""},{"key":"day","value":"30","description":""},{"key":"year","value":"2000","description":""}] 
 */
     /* fullname,gender,dob,nationality,phone,currentCompany,about */
    //  date format yr-mt-dy
     const user = await Jobseeker.findById("5fd7a27c9337922d884bb21b");
     user.bio = req.body.bio;
     user.dob = new Date(req.body.year+'-'+req.body.month+'-'+req.body.day);
     await user.save();
     console.log(user);
     res.send("ok");
  }


}