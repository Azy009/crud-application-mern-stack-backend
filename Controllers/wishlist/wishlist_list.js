
const wishlist = require("../../Models/wishlist");
const wishlist_list = async (req, res) => { 
try{
  const wishlistdata = await wishlist.find().populate('user_id', 'name email mobile').populate('product_id', 'name image1 description weight weighttype');
    res.send({status:"sucessfully",data:wishlistdata});

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err});
}
}

module.exports = wishlist_list