const usertable = require("../../Models/user.js");
const sendEmail = require("../../middlewares/emailconfig.js");

const user_creation = async (req, res) => {
  try {
    const { full_name, first_name, last_name, email, mobile, address, country, state, city, pincode, status } = req.body;    
    const createuser = new usertable({ full_name, first_name, last_name, email, mobile, address, country, state, city, pincode, status });

    const response = await createuser.save();
    sendEmail(email,"Email in Mern stack",`Hello ${full_name} its just a Testing Message`)
    res.send({ status: "successfull", data: response });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.json({ status: "failed", errors: { email: `Email already exists` } });
    } else if (error.code === 11000 && error.keyPattern.mobile) {
      return res.json({ status: "failed", errors: { mobile: `Mobile number already exists` } });
    } else {
      console.error("Failed to create user:", error);
      res.status(500).json({ status: "failed", errors: ["Internal server error"] });
    }
  }
};

module.exports = user_creation;
