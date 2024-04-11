const contact = require("../../Models/contactus");
const contactlist = async (req, res) => { 
try{
  const contactlisting = await contact.find();
    res.send({status:"sucessfully",data:contactlisting})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}


}

module.exports = contactlist