const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderid: {
      type: String,
      required: true,
      unique: [true,"already in database"],
    },
    shipping_first_name: {
      type: String,
      required: true,
    },
    shipping_last_name: {
      type: String,
      required: true,
    },
    shipping_country: {
      type: String,
      required: true,
    },
    shipping_state: {
      type: String,
      required: true,
    },
    shipping_city: {
      type: String,
      required: true,
    },
    shipping_pincode: {
      type: String,
      required: true,
    },
    shipping_address1: {
      type: String,
      required: true,
    },
    shipping_address2: {
      type: String,
      required: true,
    },
    shipping_email: {
      type: String,
      required: [true,"email is Required"],
    },
    shipping_mobile: {
      type: String,
      required: [true,"mobile is Required"],
    },
    coupon_name: {
      type: String,
      default:null
    },
    coupon_amount: {
      type: Number,
     default:0
    },
    payment_key: {
      type: String,
      default: null,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    order_status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
    payment_status: {
      type: String,
      enum: ['pending', 'received'],
      default: 'pending',
    },
    payment_method: {
      type: String,
      enum: ['COD', 'Online'],
      default: 'COD',
    },
    shipping_charges: {
      type: Number,
     default:0
    },
    tax_amount: {
      type: Number,
     default:0
    },
    sub_total_amount: {
      type: Number
    },
    grand_total_amount: {
      type: Number
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Usertable'
    }
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
