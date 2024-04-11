
const product = require("../../Models/product");
const productlist = async (req, res) => { 
try{
  const productlisting = await product.find();
    res.send({status:"sucessfully",data:productlisting})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}


}

module.exports = productlist