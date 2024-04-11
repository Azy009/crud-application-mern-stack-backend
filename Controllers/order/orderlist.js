const order = require("../../Models/order");
const orderlist = async (req, res) => { 
try{
  const orderlisting = await order.find().populate('user_id', 'first_name last_name email mobile').sort({ createdAt: -1 });
    res.send({status:"sucessfully",data:orderlisting})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}
}

module.exports = orderlist