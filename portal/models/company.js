const mongoose = require("mongoose");


const companySchema = new mongoose.model({
    name:String,
    category:String,
    address:String,
    country:String,
    city:String,
    phone:String,
    established:{type:Date,required:true},
    total_employee:String,
    website:String,
    social:{
        fb:String,
        instagram:string
    },
    about:string,
    logo:{
        url:string,
        public_id:string
    }
});

module.exports = mongoose.model("Company",companySchema)