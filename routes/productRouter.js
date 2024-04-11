const express = require('express')
const router = express.Router()
const createproduct = require('../Controllers/Product/createproduct.js');
const upload = require('../middlewares/image-uploader.js');
const productlist = require('../Controllers/Product/productlist.js');
const singleproduct = require('../Controllers/Product/singleproduct.js');
const updateproduct = require('../Controllers/Product/updateproduct.js');
const deleteproduct = require('../Controllers/Product/deletecategory.js');
const frontendproductlistbycategory = require('../Controllers/Product/frontend/frontend_productlist_bycategory.js');
const frontend_singleproduct = require('../Controllers/Product/frontend/frontend_singleproduct.js');
const checkuser = require('../middlewares/checkuser.js');
const searchitem = require('../Controllers/Product/frontend/frontend_search.js');

router.get('/',productlist)
router.post('/',upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
  ]),createproduct)
router.patch('/:id',upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
  ]),updateproduct)
  router.get('/:id',singleproduct)
  router.get('/search/:name',searchitem)
  router.get('/product-by-category/:id',frontendproductlistbycategory)
  router.get('/product-detail/:id',checkuser,frontend_singleproduct)
  router.delete('/:id',deleteproduct)



module.exports = router