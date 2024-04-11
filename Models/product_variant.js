const mongoose = require("mongoose");

const productvariantSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_url: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product'
    },
    product_image1: {
      type: String,
      required: true,
      default: null,
    },
    product_image2: {
      type: String,
      required: true,
      default: null,
    },
    product_image3: {
      type: String,
      required: true,
      default: null,
    },
    product_image4: {
      type: String,
      required: true,
      default: null,
    },
    brand: {
      type: String,
      // required: true,
      default: null,
    },
    size: {
      type: String,
      // required: true,
      default: null,
    },
    color: {
      type: String,
      // required: true,
      default: null,
    },
    parent_category: {
      type: Array,
      required: true,
    },
    child_category: {
      type: Array,
      default: [],
    },
    sort_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: {
      type: String,
      required: true,
    },
    skucode: {
      type: String,
      // required: true,
      default: null,
    },
    status: {
      type: String,
      // required: true,
      default: "Active",
    },
    newarrivedproduct: {
      type: String,
      default: "Inactive",
    },
    trendingproduct: {
      type: String,
      default: "Inactive",
    },
    featuredproduct: {
      type: String,
      default: "Inactive",
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    weight_type: {
      type: String,
      required: false,
      default: "ml",
    },
    mrp_price: {
      type: Number,
      required: true,
      default: 0,
    },
    selling_price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    dynamicAttributes: {  type: Array,
      default: [], },
  },
  { timestamps: true }
);

const Variant = mongoose.model("variant", productvariantSchema);
module.exports = Variant;
