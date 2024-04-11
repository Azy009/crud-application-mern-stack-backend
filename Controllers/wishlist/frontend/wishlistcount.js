const wishlist = require("../../../Models/wishlist");
const wishlistcount = async (req, res) => {
  try {
    const user_id = req.user.id;
    const userCart = await wishlist.find({ user_id });
    if (!userCart) {
      return res.status(404).json({ staus: 0, message: "User cart is Empty" });
    }
    let totalItems = 0;
    userCart.forEach((cartItem) => {
      totalItems += 1;
    });

    res.status(200).send({ status: 1, totalItems });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = wishlistcount;
