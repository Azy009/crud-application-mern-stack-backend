const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    item_or_variant: {
      type: String,
      required: true,
      default:'item',
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product',
      default:null
    },
    product_variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'variant',
      default:null
    },
    product_qty: {
      type: Number,
     default:1
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Usertable'
    },
    orderstatus: {
      type: String,
      default:'add to cart',
    },
    orderid: {
      type: String,
      default:null,
    }
  },
  { timestamps: true }
);

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
