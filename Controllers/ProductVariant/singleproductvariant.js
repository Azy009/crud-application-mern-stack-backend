const variant = require("../../Models/product_variant");
const category = require("../../Models/category");
const mongoose = require("mongoose");
const singleproductvariant = async (req, res) => {
  try {
    const data = await variant.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ error: "product not found" });
    }
    let parentcategory = await fetchchildcategory(data.parent_category);
    let childcategory = await fetchchildcategory(data.child_category);
    res.send({ status: "successfully", data ,parentcategory,childcategory,slug:data.product_url.replace(/-/g, ' ')});
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching data" });
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

module.exports = singleproductvariant;
