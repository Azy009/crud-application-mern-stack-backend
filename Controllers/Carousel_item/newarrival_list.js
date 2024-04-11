
const product = require("../../Models/product");
const newarrival = async (req, res) => { 
try{
  const newarrivallist = await product.find({newarrivedproduct:'Active'}).select('product_name _id selling_price mrp_price product_image1');
    res.send({status:"sucessfully",data:newarrivallist})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = newarrival