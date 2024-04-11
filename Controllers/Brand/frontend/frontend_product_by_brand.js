
const product = require("../../../Models/product");
const productbybrand = async (req, res) => { 
try{
  const productbybrandlist = await product.find({brand:req.params.name}).select('product_name _id selling_price mrp_price product_image1');
    res.send({status:"sucessfully",data:productbybrandlist})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = productbybrand