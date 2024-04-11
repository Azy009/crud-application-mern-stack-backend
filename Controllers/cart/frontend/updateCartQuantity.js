const cart = require("../../../Models/cart");

const updateCartQuantity = async (req, res) => {
  try {
    const { cartItemId, newQuantity } = req.body;
    const user_id = req.user.id;

    const existingCartItem = await cart.findOne({
      _id: cartItemId,
      user_id,
    });

    if (existingCartItem) {
      existingCartItem.product_qty = newQuantity;
      await existingCartItem.save();
      res.send({ status: "successfully", data: existingCartItem });
    } else {
      res.status(404).send({ status: "failed", message: "Cart item not found" });
    }
  } catch (err) {
    console.log(`Here is error: ${err}`);
    res.status(500).send({ status: "failed", errors: err.message });
  }
};

module.exports = updateCartQuantity;
