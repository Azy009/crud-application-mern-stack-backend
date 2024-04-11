const express = require('express')
const router = express.Router()
const upload = require('../middlewares/image-uploader.js');
const createbrand = require('../Controllers/Brand/createbrand.js');
const brandlist = require('../Controllers/Brand/brand_list.js');
const admin_brandlist = require('../Controllers/Brand/brandlist.js');
const deletebrand = require('../Controllers/Brand/deletebrand.js');
const brandsingle = require('../Controllers/Brand/brandsingle.js');
const updatebrand = require('../Controllers/Brand/updatebrand.js');
const frontend_brandlist = require('../Controllers/Brand/frontend/frontend_brandlist.js');
const productbybrand = require('../Controllers/Brand/frontend/frontend_product_by_brand.js');

router.post('/',upload.fields([
    { name: 'brand_image', maxCount: 1 },
  ]),createbrand);
router.get('/',admin_brandlist);
router.get('/frontend',frontend_brandlist);
router.get('/brandlist',brandlist);
router.get('/frontend/:name',productbybrand);
router.get('/:id',brandsingle);
router.delete('/:id',deletebrand);
router.patch('/:id',upload.fields([
    { name: 'brand_image', maxCount: 1 },
  ]),updatebrand);
module.exports = router