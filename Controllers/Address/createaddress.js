const address = require("../../Models/address.js");

const createaddress = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      pincode,
      city,
      state,
      country,
      address1,
      address2,
    } = req.body;
    const userId = req.user.id;

    const existingAddresses = await address.find({ userId });

    let insertaddress;
    if (existingAddresses.length === 0) {
      // If no existing addresses, set defaultaddress to true for the first address
      insertaddress = new address({
        first_name,
        last_name,
        email,
        mobile,
        pincode,
        city,
        state,
        country,
        address1,
        address2,
        userId,
        defaultaddress: true,
      });
    } else {
      insertaddress = new address({
        first_name,
        last_name,
        email,
        mobile,
        pincode,
        city,
        state,
        country,
        address1,
        address2,
        userId,
        defaultaddress: false,
      });
    }

    const response = await insertaddress.save();

    res.send({ status: "successful", data: response });
  } catch (errors) {
    res.send({ status: "failed", errors: errors });
    console.log("failed", errors);
  }
};

module.exports = createaddress;
