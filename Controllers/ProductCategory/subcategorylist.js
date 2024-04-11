const category = require("../../Models/category");

const subcategorylist = async (req, res) => {
  try {
    // Extract category IDs from the request body as an array
    const categoryIds = req.body.categorys ? req.body.categorys.split(',').map(id => id.trim()) : [];

    // Array to store the responses for each category ID
    const categoryResponses = [];

    // Loop through each category ID
    for (const categoryId of categoryIds) {
      // Find categories where the current category ID matches any ID in parentcategory using regex
      const categories = await category.find({
        parentcategory: { $regex: new RegExp(categoryId), $options: "i" },
      });
      // Push the response for the current category ID into the array
      categoryResponses.push({ categoryId, categories });
    }

    // Check if any categories are found for any of the category IDs
    if (categoryResponses.some(response => response.categories.length > 0)) {
      res.send({ status: "success", data: categoryResponses });
    } else {
      res.send({ status: "success", message: "No categories found for the given IDs" });
    }
  } catch (err) {
    res.status(500).send({ status: "failed", errors: err.message });
  }
};

module.exports = subcategorylist;
