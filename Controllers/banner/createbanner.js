const banner = require("../../Models/banner");
const createbanner = async (req, res) => {
  // console.log("req",req)
  try {
    const { banner_name,banner_link,banner_alt, status, description, banner_type } = req.body;
    const addbanner = new banner({
      banner_name,
      status,
      description,
      banner_type,
      banner_link,
      banner_alt,
      banner: req.files.banner[0].filename,
    });
    const data = await addbanner.save();
    res.status(201).json({ status: "successfull", data });
  } catch (error) {
    console.log("error",error)
    res.send({ status: "faild", error: error });
  }
};

module.exports = createbanner;
