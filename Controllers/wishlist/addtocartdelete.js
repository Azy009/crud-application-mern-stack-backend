
const cart = require("../../Models/cart");
const addtocartdelete = async (req, res) => { 
  const { cart_id } = req.params;
  try {
    // Use Mongoose to find and remove the cart item by its ID
    const deletedCartItem = await cart.findByIdAndRemove(cart_id);

    if (!deletedCartItem) {
      return res.status(404).send({ message: 'Cart item not found' });
    }

    res.status(200).send({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }


}

module.exports = addtocartdelete