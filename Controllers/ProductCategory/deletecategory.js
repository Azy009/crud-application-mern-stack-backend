const category = require("../../Models/category");
const deletecategory = async (req, res) => {
  try {
    const categories = await category.findByIdAndDelete(req.params.id);
    res.send({
      status: "successfully delete",
      data: categories
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting categories" });
  }
};


module.exports = deletecategory;
