const usertable = require("../../Models/usertable.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailconfig = require("../../middlewares/emailconfig.js");
const secretKey = '12345678910';
const register = async (req, res) => {
  try {
    const { first_name,last_name,dob, email, mobile, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const bcrypt_password = await bcrypt.hash(password, salt)
    const createuser = new usertable({
      first_name,
      last_name,
      email,
      dob,
      mobile,
      password:bcrypt_password,
    });

    const response = await createuser.save();
    const token = jwt.sign({ id: response.id }, secretKey, { expiresIn: '1h' });

    res.send({ status: "sucessful", data: response,token:token });
  } catch (errors) {
    res.send({ status: "faild", errors: errors });
    console.log('faild',errors)
  }
};

module.exports = register;
