const attribute = require("../../Models/attribute");
const attributelist = async (req, res) => {
  try {
    const attributedata = await attribute.find();
    res.send({ status: "sucessful", data: attributedata });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err });
  }
};

module.exports = attributelist;
