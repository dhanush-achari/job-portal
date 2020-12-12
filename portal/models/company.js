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
        instagram:String
    },
    about:string,
    logo:{
        url:String,
        public_id:String
    }
});

module.exports = mongoose.model("Company",companySchema)