const attribute = require("../../Models/attribute");
const attribute_single = async (req, res) => {
  try {
    const attributedata = await attribute.findById(req.params.id);
    res.send({
      status: "successfully",
      data: attributedata,
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching Attribute data" });
  }
};

module.exports = attribute_single;
