const brand = require("../../Models/brand");
const createbrand = async (req, res) => {
  try {
    const {brand_name,description,status } = req.body;
    const createbrand = new brand({
      brand_name,
      description,
      status,
      brand_image: req.files.brand_image[0].filename,
    });
    const data = await createbrand.save();
    res.status(201).json({ status: "successfull", data });
  } catch (error) {
    res.send({ status: "faild", error: error });
  }
};

module.exports = createbrand;
