const Usertable = require("../../Models/user");
const deleteuser = async (req, res) => {
  try {
    const user = await Usertable.findByIdAndDelete(req.params.id);
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
