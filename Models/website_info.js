const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var webinfoSchema = new mongoose.Schema({
    website_name:{
        type:String,
    },
    mobile_no:{
        type:Number,
        default:null,
    },
    address:{
        type:String,
        default:null,
    },
    email:{
        type:String,
        default:null,
    },
    facebook:{
        type:String,
        default:null,
    },
    instagram:{
        type:String,
        default:null,
    },
    youtube:{
        type:String,
        default:null,
    },
    twitter:{
        type:String,
        default:null,
    },
    pinterest:{
        type:String,
        default:null,
    },
    gstno: {
        type: String,
        default:null,
      },
    logo:{
        type:String,
        default:null
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Webinfo', webinfoSchema);