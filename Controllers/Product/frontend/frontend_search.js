const product = require("../../../Models/product");
const productVariant = require("../../../Models/product_variant");

const searchitem = async (req, res) => {
  try {
    const searchTerm = req.params.name; // Assuming the search term is passed as a query parameter (?q=searchTerm)

    // Search in both product and product variant collections
    const productResults = await product.find({
      $or: [
        { product_name: { $regex: searchTerm, $options: "i" } },
        // Add more fields to search if needed
      ],
    });

    const productVariantResults = await productVariant.find({
      $or: [
        { product_name: { $regex: searchTerm, $options: "i" } },
        // Add more fields to search if needed
      ],
    });

    // Combine results into a single array
    const combinedResults = [...productResults, ...productVariantResults];

    res.send({
      status: "successful",
      results: combinedResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while searching" });
  }
};

module.exports = searchitem;
