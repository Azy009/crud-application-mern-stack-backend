
const product = require("../../Models/product");
const featureitem = async (req, res) => { 
try{
  const featureitemlist = await product.find({featuredproduct:'Active'}).select('product_name _id selling_price mrp_price product_image1');
    res.send({status:"sucessfully",data:featureitemlist})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = featureitem