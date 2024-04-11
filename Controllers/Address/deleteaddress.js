const address = require("../../Models/address");
const deleteaddress = async (req, res) => {
  try {
    const addressdlt = await address.findByIdAndDelete(req.params.id);
    console.log("addressdlt", addressdlt);
    res.send({
      status: "successfully delete",
      data: addressdlt,
    });
  } catch (err) {
    res.status(500).send({ error: "An error occurred while deleting User" });
  }
};

module.exports = deleteaddress;
