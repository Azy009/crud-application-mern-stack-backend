const order = require("../../Models/order");

const updateorderstatus = async (req, res) => {
  const orderid = req.params.id;
  try {
    const updatedOrder = await order.findByIdAndUpdate(orderid, req.body, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    res.json({ status: "successfully update", data: updatedOrder });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ status: "failed", errors: err.message });
  }
};

module.exports = updateorderstatus;
