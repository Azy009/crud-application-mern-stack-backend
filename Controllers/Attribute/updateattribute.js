const attribute = require("../../Models/attribute");
const updateattribute = async (req, res) => {
  try {
    const valueary = convertStringToArray(req.body.attributeValues);
    const addattribute = {
      attributeName: req.body.attributeName,
      attributeValues: valueary,
    };
    const updatedattribute = await attribute.findByIdAndUpdate(
      req.params.id,
      addattribute,
      { new: true }
    );
    res.send({ status: "successfully update", data: updatedattribute });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err });
  }
};

function convertStringToArray(inputString) {
  const dataArray = inputString.split(",");

  const resultArray = dataArray.map((element) => {
    const numericValue = Number(element.trim());

    if (!isNaN(numericValue)) {
      return numericValue;
    }

    return element.trim();
  });

  return resultArray;
}

module.exports = updateattribute;
