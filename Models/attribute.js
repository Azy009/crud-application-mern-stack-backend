const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var attributeSchema = new mongoose.Schema({
    attributeName:{
        type:String,
        required:[true, "attribute Name is required"],
        unique:[true,"attribute Name must be unique"],
        // index:true,
    },
    attributeValues:{
        type:Array,
        default:[]
    },
    status: {
        type: String,
        default:"Active",
      },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Attribute', attributeSchema);