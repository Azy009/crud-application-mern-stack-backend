const Order = require("../../Models/order");
const Cart = require("../../Models/cart");

const orderlistbyuser = async (req, res) => {
  try {
    const user_id = req.user.id;

    // Fetch orders for the user
    const orderlist = await Order.find({ user_id });

    if (!orderlist || orderlist.length === 0) {
      return res.status(404).json({ status: 0, message: "No Orders Found" });
    }

    // Iterate over each order to calculate totalItems
    const ordersWithTotalItems = await Promise.all(orderlist.map(async (order) => {
      // Fetch cart items for each order
      const cartinfo = await Cart.find({ orderid: order.orderid });

      // Calculate totalItems for the order
      let totalItems = 0;
      cartinfo.forEach((cartItem) => {
        totalItems += cartItem.product_qty;
      });

      // Return order details along with totalItems
      return {
        order_id: order.orderid,
        user_name: order.user_name,
        order_date: order.order_date,
        order_status: order.order_status,
        grand_total_amount: order.grand_total_amount,
        totalItems: totalItems
      };
    }));

    res.status(200).json({ status: 1, orderlist: ordersWithTotalItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = orderlistbyuser;
