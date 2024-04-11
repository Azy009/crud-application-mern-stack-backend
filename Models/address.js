const mongoose = require("mongoose");
const moment = require("moment-timezone");
const addressSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Usertable'
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
    status: {
      type: String,
      default:"Active"
    },
    defaultaddress: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


addressSchema.pre('save', function(next) {
  this.createdAt = moment().format('YYYY-MM-DD');
  this.updatedAt = moment().format('YYYY-MM-DD');
  next();
});

const Usertable = mongoose.model("address", addressSchema);
module.exports = Usertable;
