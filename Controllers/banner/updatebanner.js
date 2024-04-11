
const banner = require("../../Models/banner");
const updatebanner = async (req, res) => { 
try{
  const { banner_name,banner_link, status, description,banner_alt, banner_type } = req.body;
  console.log("first bodu of baner",req.body)
    let bannerobj = {}
    if(req.files.banner){
      bannerobj = {
          banner_name,
          status,
          description,
          banner_type,
          banner_link,
          banner_alt,
          banner: req.files.banner[0].filename,
        };
    }else{
      bannerobj = {
        banner_name,
        status,
        description,
        banner_type,
        banner_alt,
        banner_link,
      };
    }
    const updatedbanner = await banner.findByIdAndUpdate(req.params.id, bannerobj, { new: true });

    if (!updatedbanner) {
      return res.status(404).json({ status: "failed", message: "banner not found" });
    }

    res.send({ status: "successfully update", data: updatedbanner });

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}


}

module.exports = updatebanner