const wishlist = require("../../Models/wishlist");

const addtowishlist = async (req, res) => {
  try {
    const {
      product_name,
      product_id,
      product_variant_id,
      item_or_variant,
    } = req.body;
    const user_id = req.user.id;
      const addproduct = new wishlist({
        product_name,
        product_id,
        user_id,
        product_variant_id,
        item_or_variant,
      });

      const response = await addproduct.save();
      res.send({ status: "successfully", data: response });
    
  } catch (err) {
    console.log(`Here is error: ${err}`);
    res.send({ status: "failed", errors: err });
  }
};

module.exports = addtowishlist;
