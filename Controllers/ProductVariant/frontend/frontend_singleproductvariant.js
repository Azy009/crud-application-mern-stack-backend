const variant = require("../../../Models/product_variant");
const frontend_singleproductvariant = async (req, res) => {
  try {
    // console.log("type of varinat",req);
    // const data = await variant.find({ product_id: req.params.parentId  ,
    //       dynamicAttributesVariants: {
    //     $elemMatch: {
    //       $and: [
    //         { [req.params.attr]: req.params.attrvalue }
    //       ]
    //     }
    //   }
    // })

    const attributeFieldName = req.params.attr;
    const attributeValue = req.params.attrvalue;

    const condition = {};
    condition[attributeFieldName] = attributeValue;
    console.log("jjdjjdjdjdjd", condition);
    const data = await variant.find({
      product_id: req.params.parentid,
      dynamicAttributes: {
        $elemMatch: condition
      }
    });
    console.log("Actual Query:", query._mongooseOptions); 

    if (!data) {

      return res.status(404).send({ error: "product variant not found" });
    }

    res.send({ status: "successfully bb", data });
  } catch (err) {
    console.log("eror", err);
    res.status(500).send({ error: "An error occurred while fetching data" });
  }
};

module.exports = frontend_singleproductvariant;
