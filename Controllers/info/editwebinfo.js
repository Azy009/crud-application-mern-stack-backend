const website_info = require("../../Models/website_info");
const editwebinfo = async (req, res) => {
  try {
    const {
      website_name,
      mobile_no,
      address,
      email,
      facebook,
      instagram,
      youtube,
      twitter,
      pinterest,
      gstno,
    } = req.body;
    let updatedate = {
      website_name,
      mobile_no,
      address,
      email,
      facebook,
      instagram,
      youtube,
      twitter,
      pinterest,
      gstno,
    };

    for (let i = 1; i <= 1; i++) {
      const imageFieldName = `logo`;
      if (req.files[imageFieldName]) {
        updatedate[imageFieldName] = req.files[imageFieldName][0].filename;
      }
    }
    const data = await website_info.findByIdAndUpdate(
      `6563815007f92d08b1f7df3c`,
      updatedate,
      { new: true }
    );

    if (!data) {
      return res
        .status(404)
        .json({ status: "failed", message: "no Record found" });
    }

    res.send({ status: "successfully update", data: data });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err });
  }
};

module.exports = editwebinfo;
