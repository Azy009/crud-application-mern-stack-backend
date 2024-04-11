const attribute = require("../../Models/attribute");
const createattribute = async (req, res) => {
  try {
    const checkname = await checkIfAttributeExists(req.body.attributeName);
    if (checkname == true) {
     const valueary = convertStringToArray(req.body.attributeValues);
      const addattribute = new attribute({
        attributeName:req.body.attributeName,
        attributeValues:valueary
      });
      const data = await addattribute.save();
      res.status(201).json({ status: "successfull", data });
    } else {
      res.status(404).json({
        status: "faild",
        error: {
          attributeName: {
            message: "Attribute Name with this name already exist",
            path: "name",
          },
        },
      });
    }
  } catch (error) {
    res.send({ status: "faild", error: error.errors });
  }
};

async function checkIfAttributeExists(name) {
  let category_response = await attribute.findOne({ attributeName: name });
  if (category_response == null) {
    return true;
  } else {
    return false;
  }
}


function convertStringToArray(inputString) {
  const dataArray = inputString.split(',');

  const resultArray = dataArray.map((element) => {
    const numericValue = Number(element.trim());

    if (!isNaN(numericValue)) {
      return numericValue;
    }

    return element.trim();
  });

  return resultArray;
}


module.exports = createattribute;
