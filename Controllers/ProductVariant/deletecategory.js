const variant = require("../../Models/product_variant");
const deleteproductvariant = async (req, res) => {
  try {
    const Product = await variant.findByIdAndDelete(req.params.id);
    res.send({
      status: "successfully delete",
      data: Product
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting Product" });
  }
};


module.exports = deleteproductvariant;
