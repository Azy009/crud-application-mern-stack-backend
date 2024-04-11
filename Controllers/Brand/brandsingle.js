const brand = require("../../Models/brand");
const brandsingle = async (req, res) => {
  try {
    const branddetail = await brand.findById(req.params.id);
    if (!branddetail) {
      return res.status(404).send({ error: "branddetail not found" });
    }
    res.send({
      status: "successfully",
      data: branddetail,
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching brand details" });
  }
};

module.exports = brandsingle;
