const product = require("../../../Models/product");
const category = require("../../../Models/category");
const variant = require("../../../Models/product_variant");
const wishlist = require("../../../Models/wishlist");
const mongoose = require("mongoose");

const frontend_singleproduct = async (req, res) => {
  try {
    const data = await product.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ error: "Product not found" });
    }

    const user_id = req.user.id || 0;

    let wishlist_status = false;

    if (user_id) {
      const productWishlistEntry = await wishlist.findOne({
        user_id,
        product_id: req.params.id,
      });
      wishlist_status = productWishlistEntry ? true : false;
    }

    let parentcategory = await fetchchildcategory(data.parent_category);
    let childcategory = await fetchchildcategory(data.child_category);
    const productvariant = await variant.find({ product_id: req.params.id });
    const variantIds = productvariant.map((v) => v._id);
    const variantWishlistEntries = await wishlist.find(user_id == 0 ? {
      product_variant_id: { $in: [] },
    } : {
      user_id,
      product_variant_id: { $in: variantIds },
    });
    const variantWishlistMap = new Map(variantWishlistEntries.map((entry) => [entry.product_variant_id.toString(), true]));
    let combinedDynamicAttributes = [];
    const variantsWithWishlistStatus = productvariant.map((variant) => {
      const dynamicAttributesVariant = variant.dynamicAttributes || [];
      combinedDynamicAttributes = [...data.dynamicAttributes, ...dynamicAttributesVariant];
      const variantWishlistStatus = variantWishlistMap.has(variant._id.toString());
      return {
        ...variant._doc,
        dynamicAttributes: combinedDynamicAttributes,
        wishlist_status: variantWishlistStatus,
      };
    });

    // Filter out duplicate attributes based on their keys
    const uniqueAttributes = Array.from(
      new Map(combinedDynamicAttributes.map((attr) => [JSON.stringify(attr), attr])).values()
    );

    res.send({
      status: "successfully",
      data: { ...data._doc, wishlist_status },
      parentcategory,
      childcategory,
      productvariant: variantsWithWishlistStatus,
      uniqueAttributes,
      slug: data.product_url.replace(/-/g, " "),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred while fetching data" });
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    return [];
  }
};

module.exports = frontend_singleproduct;
