const mongoose = require("mongoose");
const moment = require("moment-timezone");
// const indianTimestampPlugin = require("../middlewares/indianTimestampPlugin");
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true,"email is Required"],
      unique: [true,"already in database"],
    },
    mobile: {
      type: String,
      required: [true,"mobile is Required"],
      unique: [true,"already in database"],
    },
    dob: {
      type: Date, // Assuming the date of birth is a Date type
      required: true,
    },
    status: {
      type: String,
      default:"Active"
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      default: "Inactive",
    },
  },
  {
    timestamps: true,
  }
);


// userSchema.pre('save', function (next) {
//   this.createdAt = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
//   this.updatedAt = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
//   next();
// });
// userSchema.plugin(indianTimestampPlugin);


userSchema.pre('save', function(next) {
  this.createdAt = moment().format('YYYY-MM-DD');
  this.updatedAt = moment().format('YYYY-MM-DD');
  next();
});

const Usertable = mongoose.model("Usertable", userSchema);
module.exports = Usertable;
