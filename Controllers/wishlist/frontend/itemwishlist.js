const wishlist = require("../../../Models/wishlist");
const itemwishlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const itemdata = await wishlist
      .find({ user_id})
      .populate("user_id", "name email mobile")
      .populate(
        "product_variant_id",
        "product_name product_image1 selling_price mrp_price product_id"
      )
      .populate(
        "product_id",
        "product_name product_image1 selling_price mrp_price"
      );

    if (!itemdata) {
      return res.status(404).json({ message: "User cart is Empty" });
    }
    res.status(200).send({ status: "successfully", data: itemdata });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = itemwishlist;
