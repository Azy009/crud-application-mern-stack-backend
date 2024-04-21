const Usertable = require("../../Models/user");

const updateuser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await Usertable.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    res.json({ status: "successfully update", data: updatedUser });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ status: "failed", errors: err.message });
  }
};

module.exports = updateuser;
