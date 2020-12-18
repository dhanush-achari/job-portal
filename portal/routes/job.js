const express = require('express');
const router = express.Router();
const Job = require("../models/job")
const {errorHandler,SearchFilter} = require("../middleware/index")
// const {addDetails,UpdateDetails,DeleteDetails,PersonalDetails}  =  require("../controller/user")

router.get("/",SearchFilter,async (req,res,next)=>{
    const {dbquery} = res.locals;
    delete res.locals.dbquery
    console.log(dbquery)
    const Jobs = await Job.find(dbquery)
    res.send(Jobs)

    // res.render("index")
})


module.exports = router;
