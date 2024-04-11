const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Usertable'
    }
  },
  { timestamps: true }
);

const wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlist;
