const Usertable = require("../../Models/usertable");
const mongoose = require("mongoose");
const deleteuser = async (req, res) => {
  try {
    const user = await Usertable.findByIdAndDelete(req.params.id);
console.log("user",user)
    res.send({
      status: "successfully delete",
      data: user
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting User" });
  }
};


module.exports = deleteuser;
