const order = require("../../Models/order");
const cart = require("../../Models/cart");

const singleorder = async (req, res) => {
  try {
    const data = await order.findById(req.params.id);

    if (!data) {
        return res.status(404).send({ error: "product not found" });
    }
    const existingCartItem = await cart.find({orderid: data.orderid}).populate('product_variant_id', 'product_name product_image1 description selling_price mrp_price weight weighttype').populate('product_id', 'product_name product_image1 description selling_price mrp_price weight weighttype');    
    res.send({ status: "successfully", data ,existingCartItem});
  } catch (err) {
    res.status(500).send({ error: "An error occurred while fetching data" });
  }
};

module.exports = singleorder;
