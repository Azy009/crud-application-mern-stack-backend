const product = require("../../Models/product");
const deleteproduct = async (req, res) => {
  try {
    const Product = await product.findByIdAndDelete(req.params.id);
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


module.exports = deleteproduct;
