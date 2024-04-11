
const brand = require("../../Models/brand");
const admin_brandlist = async (req, res) => { 
try{
  const data = await brand.find();
    res.send({status:"sucessful",data})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = admin_brandlist