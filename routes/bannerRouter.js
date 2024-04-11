const express = require('express')
const router = express.Router()
const upload = require('../middlewares/image-uploader.js');
const createbanner = require('../Controllers/banner/createbanner.js');
const bannerlist = require('../Controllers/banner/bannerlist.js');
const bannersingle = require('../Controllers/banner/bannersingle.js');
const deletebanner = require('../Controllers/banner/deletebanner.js');
const updatebanner = require('../Controllers/banner/updatebanner.js');

router.post('/',upload.fields([
    { name: 'banner', maxCount: 1 },
  ]),createbanner);
router.get('/',bannerlist);
router.get('/:id',bannersingle);
router.delete('/:id',deletebanner);
router.patch('/:id',upload.fields([
    { name: 'banner', maxCount: 1 },
  ]),updatebanner);
module.exports = router