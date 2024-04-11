const product = require("../../../Models/product");
const variant = require("../../../Models/product_variant");
const frontend_singleproduct = async (req, res) => {
  try {
    const data = await product
      .findById(req.params.id)
      .select("dynamicAttributes");
    if (!data) {
      return res.status(404).send({ error: "product not found" });
    }
    const productvariant = await variant
      .find({ product_id: req.params.id })
      .select("dynamicAttributes");

    const dynamicAttributesMain = data.dynamicAttributes || [];
    const dynamicAttributesVariants = productvariant.map(
      (variant) => variant.dynamicAttributes || []
    );

    const combinedDynamicAttributes = [
      ...dynamicAttributesMain,
      ...dynamicAttributesVariants.flat(),
    ];

    const groupedAttributes = {};

    combinedDynamicAttributes.forEach((subArray) => {
      subArray.forEach((obj) => {
        const key = Object.keys(obj)[0];

        if (!groupedAttributes[key]) {
          groupedAttributes[key] = [];
        }

        groupedAttributes[key].push(obj);
      });
    });
    const varianttype = Object.values(groupedAttributes);
    res.send({
      status: "successfully",
      varianttype,
    });
  } catch (err) {
    res.status(500).send({ error: "An error occurred while fetching data" });
  }
};

module.exports = frontend_singleproduct;
