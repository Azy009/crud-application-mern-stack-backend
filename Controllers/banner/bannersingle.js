const banner = require("../../Models/banner");
const bannersingle = async (req, res) => {
  try {
    const bannerdetail = await banner.findById(req.params.id);
    if (!bannerdetail) {
      return res.status(404).send({ error: "bannerdetail not found" });
    }
    res.send({
      status: "successfully",
      data: bannerdetail,
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching banner details" });
  }
};

module.exports = bannersingle;
