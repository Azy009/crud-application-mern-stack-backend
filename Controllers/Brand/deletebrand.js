const brand = require("../../Models/brand");
const deletebrand = async (req, res) => {
  try {
    const branddata = await brand.findByIdAndDelete(req.params.id);
    res.send({
      status: "successfully delete",
      data: branddata
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting brand" });
  }
};


module.exports = deletebrand;
