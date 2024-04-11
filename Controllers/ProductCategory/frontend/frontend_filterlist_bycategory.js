const category = require("../../../Models/category");
const attribute = require("../../../Models/attribute");

const frontendattributelistbycategory = async (req, res) => {
  try {
    const categorydata = await category
      .findById(req.params.id)
      .select("-updatedAt -createdAt -__v")
      .lean();

    const attributeNames = categorydata.attribute || [];
    const attributeRecords = await attribute
      .find({ attributeName: { $in: attributeNames } })
      .select("-createdAt -updatedAt -_id -status -__v")
      .lean();
    categorydata.attributes = attributeRecords;
    let parentcategoryname = "";
    if (categorydata.parentcategory && categorydata.parentcategory.length > 0) {
      parentcategoryname = await category
        .findById(categorydata.parentcategory[0])
        .select("name url -_id");
    }

    res.status(200).json({
      status: "success",
      categorydata,
      parentcategoryname,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

module.exports = frontendattributelistbycategory;
