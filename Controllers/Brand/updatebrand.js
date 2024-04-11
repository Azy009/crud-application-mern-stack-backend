
const brand = require("../../Models/brand");
const updatebrand = async (req, res) => { 
try{
  const {brand_name,description,status } = req.body
  console.log("first bodu of baner",req.body)
    let brandobj = {}
    if(req.files.brand_image){
      brandobj = {
        brand_name,
        description,
        status,
        brand_image: req.files.brand_image[0].filename,
        };
    }else{
      brandobj = {
        brand_name,
        description,
        status,
      };
    }
    const updatedbrand = await brand.findByIdAndUpdate(req.params.id, brandobj, { new: true });

    if (!updatedbrand) {
      return res.status(404).json({ status: "failed", message: "brand not found" });
    }

    res.send({ status: "successfully update", data: updatedbrand });

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}


}

module.exports = updatebrand