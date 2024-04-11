const address = require("../../Models/address");
const updateaddress = async (req, res) => {
  const addressId = req.params.id;
  try {
    const updatedaddress = await address.findByIdAndUpdate(addressId, req.body, {
      new: true,
    });

    if (!updatedaddress) {
      return res
        .status(404)
        .json({ status: "failed", message: "Address not found" });
    }

    res.json({ status: "successfully update", data: updatedaddress });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ status: "failed", errors: err.message });
  }
};

module.exports = updateaddress;
