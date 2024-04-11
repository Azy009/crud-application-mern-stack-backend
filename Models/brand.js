const mongoose = require('mongoose'); 

var brandSchema = new mongoose.Schema({
    brand_name:{
        type:String,
        required:[true, "banner name is required"],
    },
    description:{
        type:String,
        required:[true, "description is required"],
    },
    status: {
        type: String,
        default:"Active",
      },
    brand_image:{
        type:String,
        default:null
    },
},{timestamps:true});

module.exports = mongoose.model('brand', brandSchema);