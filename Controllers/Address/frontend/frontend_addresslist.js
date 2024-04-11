const address = require("../../../Models/address");
const frontend_addresslist = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresslist = await address.find({ userId:userId });
    res.send({ status: "successfully", data: addresslist });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err.errors });
  }
};

module.exports = frontend_addresslist;
