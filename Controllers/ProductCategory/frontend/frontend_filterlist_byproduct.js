const product = require("../../../Models/product");
const category = require("../../../Models/category");

const frontendattributelistbyproduct = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categorydata = await category
      .findById(req.params.id)
      .select("name parentcategory");
      let parentcategoryname = "";
      if (categorydata.parentcategory && categorydata.parentcategory.length > 0) {
        parentcategoryname = await category.findById(categorydata.parentcategory[0]).select("name -_id");
      }

    const colors = await product.distinct("color", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    const brands = await product.distinct("brand", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    const sizes = await product.distinct("size", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    const weights = await product.distinct("weight", {$or: [
      { parent_category: categoryId },
      { child_category: categoryId },
    ], weight: { $gt: 0 } });
    const weightTypes = await product.distinct("weight_type", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    // Repeat the process for other filters

    const combinedWeights = weights.map((weight, index) => ({
      weight,
      weightType: weightTypes[index],
    }));

    // Calculate min and max prices
    const minPrice = await product
      .findOne({}, { selling_price: 1 })
      .sort("selling_price");
    const maxPrice = await product
      .findOne({}, { selling_price: 1 })
      .sort("-selling_price");
    // console.log("first", minPrice, maxPrice);
    // Create an object containing available filters and their values
    const availableFilters = {
      color: colors,
      brand: brands,
      size: sizes,
      combinedWeight: combinedWeights,
      minPrice,
      maxPrice,
      // Add other filters here
    };

    res.status(200).json({
      status: "success",
      availableFilters,
      categorydata,
      parentcategoryname
    });
  } catch (error) {
    console.log("dkdkdd", error);
    res.status(500).json({ status: "failed", error: error.message });
  }
};

module.exports = frontendattributelistbyproduct;
