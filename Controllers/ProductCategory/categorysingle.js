const category = require("../../Models/category");
const mongoose = require("mongoose");
const categorysingle = async (req, res) => {
  try {
    const categories = await category.findById(req.params.id);
    if (!categories) {
      return res.status(404).send({ error: "categories not found" });
    }
    let childcategory = await fetchchildcategory(categories.parentcategory);

    res.send({
      status: "successfully",
      data: categories,
      parent: childcategory,
      slug:categories.url.replace(/-/g, ' ')
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching categories" });
  }
};

const fetchchildcategory = async (categoryarray) => {
  if (categoryarray[0]) {
    try {
      const categoryIds = categoryarray[0].split(",");
      const objectIdArray = categoryIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const categories = await category.find({ _id: { $in: objectIdArray } });
      return categories;
    } catch (error) {}
  } else {
    return [];
  }
};

module.exports = categorysingle;
