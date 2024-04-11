const express = require('express')
const routercate = express.Router()
const createcategory = require('../Controllers/ProductCategory/createcategory.js');
const categorylist = require('../Controllers/ProductCategory/categorylist.js');
const categorysingle = require('../Controllers/ProductCategory/categorysingle.js');
const updatecategory = require('../Controllers/ProductCategory/updatecategory.js');
const upload = require('../middlewares/image-uploader.js');
const categorylist_level_one = require('../Controllers/ProductCategory/categorylist_level_one.js');
const deletecategory = require('../Controllers/ProductCategory/deletecategory.js');
const subcategorylist = require('../Controllers/ProductCategory/subcategorylist.js');
const frontendcategorylist = require('../Controllers/ProductCategory/frontend_category_list.js');
const frontendattributelistbycategory = require('../Controllers/ProductCategory/frontend/frontend_filterlist_bycategory.js');
const frontendattributelistbyproduct = require('../Controllers/ProductCategory/frontend/frontend_filterlist_byproduct.js');

routercate.post('/',upload.fields([
    { name: 'category_image', maxCount: 1 },
  ]),createcategory);
  routercate.get('/levelone',categorylist_level_one);
  routercate.get('/frontedcategorylist',frontendcategorylist);
  routercate.get('/attributelist/:id',frontendattributelistbyproduct);
  routercate.post('/subcategory',upload.none(),subcategorylist);
routercate.get('/',categorylist);
routercate.get('/:id',categorysingle);
routercate.get('/attribute-by-category/:id',frontendattributelistbycategory)
routercate.delete('/:id',deletecategory);
routercate.patch('/:id',upload.fields([
    { name: 'category_image', maxCount: 1 },
  ]),updatecategory);
module.exports = routercate