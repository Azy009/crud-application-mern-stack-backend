const website_info = require("../../Models/website_info");

const webinfo = async (req, res) => {
  try {
        const {
            website_name,
            mobile_no,
            address,
            email,
            facebook,
            instagram,
            youtube,
            twitter,
            pinterest,
            gstno
        } = req.body;
        const websiteinfo = new website_info({
            website_name,
            mobile_no,
            address,
            email,
            facebook,
            instagram,
            youtube,
            twitter,
            pinterest,
            gstno,
          logo: req.files.logo[0].filename,
        });
        
        const data = await websiteinfo.save();
        res.status(201).json({ status: "successfull", data });
  
   
  } catch (error) {
    res.send({ status: "faild", error:error.errors });
  }
};



module.exports = webinfo;
