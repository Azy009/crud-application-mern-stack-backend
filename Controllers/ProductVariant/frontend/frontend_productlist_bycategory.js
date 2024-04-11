const product = require("../../../Models/product");

const frontendproductlistbycategory = async (req, res) => {
  const { page, max_price, min_price, order, orderby, ...filter } = req.query;

  try {
    const categoryId = req.params.id;
    const itemsPerPage = 10;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;



    let sortOptions = {};
    if (orderby) {
      if(orderby == "trendingproduct"){
        sortOptions[orderby] =  1;
      }
      if(orderby == "newarrivedproduct"){
        sortOptions[orderby] =  1;
      }
      
      if(orderby == "selling_price"){
        sortOptions[orderby] = order === 'ASE' ? 1 : -1;
      }
    }


    // Build the base query for finding products by category
    const baseQuery = {
      $or: [{ parent_category: categoryId }, { child_category: categoryId }],
    };

    // Add price filtering to the base query
    if (min_price || max_price) {
      baseQuery.selling_price = {};
      if (min_price) baseQuery.selling_price.$gte = parseInt(min_price);
      if (max_price) baseQuery.selling_price.$lte = parseInt(max_price);
    }

    // Get total count before applying filters
    const totalCountBeforeFilter = await product.countDocuments(baseQuery);

    // Get products before applying filters
    const productsBeforeFilter = await product
      .find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(itemsPerPage);

    // If filters are present, apply filters and get filtered count and products
    if (Object.keys(filter).length > 0) {
      const filteredProducts = productsBeforeFilter.filter((product) => {
        if (product.dynamicAttributes) {
          // Check if the product matches all the filters in the URL
          return Object.entries(filter).every(([key, value]) => {
            value = String(value);
            return product.dynamicAttributes.some((attributes) => {
              return attributes.some(
                (attribute) => String(attribute[key]) === value
              );
            });
          });
        }
        return false;
      });

      const totalItems = filteredProducts.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      res.status(200).json({
        status: "success",
        data: filteredProducts.slice(skip, skip + itemsPerPage),
        totalPages,
        itemsPerPage,
        totalItems,
        pageNumber,
      });
    } else {
      // If no filters, use the count before applying filters
      const totalItems = totalCountBeforeFilter;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      res.status(200).json({
        status: "success",
        data: productsBeforeFilter,
        totalPages,
        itemsPerPage,
        totalItems,
        pageNumber,
      });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

module.exports = frontendproductlistbycategory;
