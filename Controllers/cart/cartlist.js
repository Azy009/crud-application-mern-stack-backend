const cart = require("../../Models/cart");
const cartlist = async (req, res) => { 
try{
  const cartlisting = await cart.find().populate('user_id', 'name email mobile').populate('product_variant_id', 'product_name product_image1 description selling_price mrp_price weight weighttype').populate('product_id', 'product_name product_image1 description selling_price mrp_price weight weighttype').sort({ createdAt: -1 });
    res.send({status:"sucessfully",data:cartlisting});

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err});
}
}

module.exports = cartlist