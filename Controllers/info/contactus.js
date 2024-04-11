
const contact = require("../../Models/contactus");

const contactus = async (req, res) => {
   
try{

    const {fname,lname,message,emailID,mobile_no} = req.body
    const sanddata = new contact({
      firstname : fname,
      lastname : lname,
      mobile : mobile_no,
      email : emailID,
      Message : message
    })

    const rel = await sanddata.save()
    res.send({status:"sucessful",data:rel})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild"})

}






}

module.exports = contactus