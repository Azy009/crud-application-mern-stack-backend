const express = require("express");
const router = express.Router();
const upload = require("../middlewares/image-uploader.js");
const createvariant = require("../Controllers/ProductVariant/createvariant.js");
const updateproductvariant = require("../Controllers/ProductVariant/updateproductvariant.js");
const singleproductvariant = require("../Controllers/ProductVariant/singleproductvariant.js");
const deleteproductvariant = require("../Controllers/ProductVariant/deletecategory.js");
const productvariantlist = require("../Controllers/ProductVariant/productvariantlist.js");
const frontend_singleproduct = require("../Controllers/ProductVariant/frontend/frontend_singleproduct.js");
const frontend_singleproductvariant = require("../Controllers/ProductVariant/frontend/frontend_singleproductvariant.js");

router.post(
  "/",
  upload.fields([
    { name: "product_image1", maxCount: 1 },
    { name: "product_image2", maxCount: 1 },
    { name: "product_image3", maxCount: 1 },
    { name: "product_image4", maxCount: 1 },
  ]),
  createvariant
);
router.patch(
  "/:id",
  upload.fields([
    { name: "product_image1", maxCount: 1 },
    { name: "product_image2", maxCount: 1 },
    { name: "product_image3", maxCount: 1 },
    { name: "product_image4", maxCount: 1 },
  ]),
  updateproductvariant
);
router.get("/id/:id", productvariantlist);
router.get("/:id", singleproductvariant);
router.get('/detail/:id',frontend_singleproduct)
router.get('/:parentid/:attr/:attrvalue',frontend_singleproductvariant)
router.delete("/:id", deleteproductvariant);

module.exports = router;
