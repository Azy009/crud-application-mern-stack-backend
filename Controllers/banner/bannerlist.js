
const banner = require("../../Models/banner");
const bannerlist = async (req, res) => { 
try{
  const data = await banner.find();
    res.send({status:"sucessful",data})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = bannerlist