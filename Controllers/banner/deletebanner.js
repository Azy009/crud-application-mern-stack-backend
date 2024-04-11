const banner = require("../../Models/banner");
const deletebanner = async (req, res) => {
  try {
    const bannerdel = await banner.findByIdAndDelete(req.params.id);
    res.send({
      status: "successfully delete",
      data: bannerdel
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting banner" });
  }
};


module.exports = deletebanner;
