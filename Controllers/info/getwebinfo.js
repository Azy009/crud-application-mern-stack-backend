
const website_info = require("../../Models/website_info");
const getwebinfo = async (req, res) => { 
try{
  const webinfo = await website_info.find();
    res.send({status:"sucessfull",data:webinfo})

}catch(err){
    res.send({status:"faild",errors:err})

}


}

module.exports = getwebinfo