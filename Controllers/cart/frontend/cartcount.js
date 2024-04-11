const cart = require("../../../Models/cart");
const cartcount = async (req, res) => {
  try {
    const user_id = req.user.id;
    const userCart = await cart.find({ user_id, orderstatus: "add to cart" });
    if (!userCart) {
      return res.status(404).json({ staus: 0, message: "User cart is Empty" });
    }
    let totalItems = 0;
    userCart.forEach((cartItem) => {
      totalItems += cartItem.product_qty;
    });

    res.status(200).send({ status: 1, totalItems });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = cartcount;
