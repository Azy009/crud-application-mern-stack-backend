
const product = require("../../Models/product");
const bestseller = async (req, res) => { 
try{
  const bestsellerlist = await product.find({trendingproduct:'Active'}).select('product_name _id selling_price mrp_price product_image1');
    res.send({status:"sucessfully",data:bestsellerlist})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = bestseller