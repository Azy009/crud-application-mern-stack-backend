
const brand = require("../../../Models/brand");
const frontend_brandlist = async (req, res) => { 
try{
  const data = await brand.find({status:'Active'});
    res.send({status:"sucessful",data})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = frontend_brandlist