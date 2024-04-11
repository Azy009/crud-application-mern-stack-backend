const attribute = require("../../Models/attribute");
const deleteattribute = async (req, res) => {
  console.log("dfgh");
  try {
    const attributedata = await attribute.findByIdAndDelete(req.params.id);
    res.send({
      status: "successfully delete",
      data: attributedata,
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting Attribute" });
  }
};

module.exports = deleteattribute;
