const address = require("../../Models/address");
const addresssingle = async (req, res) => {
  const addressId = req.params.id;
  try {
    const addressdetail = await address.findById(addressId);
    if (!addressdetail) {
      return res.status(404).send({ error: "address detail not found" });
    }

    res.status(200).send({ status: "successfully", data: addressdetail });
  } catch (err) {
    res
      .status(500)
      .send({
        error: "An error occurred while fetching addressdetail ",
        servererror: err,
      });
  }
};

module.exports = addresssingle;
