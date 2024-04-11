const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var bannerSchema = new mongoose.Schema({
    banner_name:{
        type:String,
        required:[true, "banner name is required"],
    },
    banner_alt:{
        type:String,
        required:[true, "banner Alt is required"],
    },
    banner_link:{
        type:String,
        required:[true, "banner Alt is required"],
    },
    banner_type:{
        type:String,
        required:[true, "banner type is required"],
    },
    description:{
        type:String,
        required:[true, "description is required"],
    },
    status: {
        type: String,
        default:"Active",
      },
    banner:{
        type:String,
        default:null
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('banner', bannerSchema);