const cart = require("../../Models/cart");

const addtocart = async (req, res) => {
  try {
    const {
      product_name,
      product_id,
      product_qty,
      product_variant_id,
      item_or_variant,
    } = req.body;
    const user_id = req.user.id;
    const existingCartItem = await cart.findOne({
      product_id,
      user_id,
      product_variant_id,
      item_or_variant,
      orderstatus: "add to cart"
    });

    if (existingCartItem) {
      existingCartItem.product_qty += product_qty;
      await existingCartItem.save();
      res.send({ status: "successfully", data: existingCartItem });
    } else {
      const addproduct = new cart({
        product_name,
        product_id,
        product_qty,
        user_id,
        product_variant_id,
        item_or_variant,
      });

      const response = await addproduct.save();
      res.send({ status: "successfully", data: response });
    }
  } catch (err) {
    console.log(`Here is error: ${err}`);
    res.send({ status: "failed", errors: err });
  }
};

module.exports = addtocart;
