
const wishlist = require("../../../Models/wishlist");
const removewishlist = async (req, res) => { 
    try {
    const {
        product_id,
        product_variant_id,
        item_or_variant,
      } = req.body;
      const user_id = req.user.id;
    const deletedCartItem = await wishlist.findOneAndRemove(item_or_variant == 'item' ? {user_id,product_id} : {user_id,product_variant_id});
    if (!deletedCartItem) {
      return res.status(404).send({ message: 'Wishlist item not found' });
    }
    res.status(200).send({ status:'successfully',message: 'Wishlist item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }


}

module.exports = removewishlist