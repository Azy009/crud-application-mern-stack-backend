
const category = require("../../Models/category");
const categorylist = async (req, res) => { 
try{
  const categories = await category.find().sort({ createdAt: -1 });
    res.send({status:"sucessful",data:categories})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}


}

module.exports = categorylist