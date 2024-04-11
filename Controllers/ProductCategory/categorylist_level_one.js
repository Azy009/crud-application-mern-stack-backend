const category = require("../../Models/category");

const categorylistlevelone = async (req, res) => {
  try {
    const categories = await category.find({ parentcategory: [] });
    res.send({ status: "successfully", data: categories });
  } catch (err) {
    res.send({ status: "faild", errors: err });
  }
};

module.exports = categorylistlevelone;
