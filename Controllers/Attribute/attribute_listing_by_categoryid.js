const category = require("../../Models/category");
const attribute = require("../../Models/attribute");

const attribute_listing_by_categoryid = async (req, res) => {
  try {
    const categorydata = await category.findById(req.params.id);
    const attributes = await attribute.find({
      attributeName: { $in: categorydata.attribute },
    });
    res.send({
      status: "successfully",
      data: attributes,
    });
  } catch (err) {
    res.status(500).send({ status: "failed", errors: err.message });
  }
};

module.exports = attribute_listing_by_categoryid;
