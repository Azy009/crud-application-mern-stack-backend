const product = require("../../Models/product");
const brandlist = async (req, res) => { 
try{
  const brandlist = await product.distinct("brand");
    res.send({status:"sucessfully",data:brandlist})
}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})
}}

module.exports = brandlist