const express = require('express')
const router = express.Router()
const newarrival = require('../Controllers/Carousel_item/newarrival_list.js');
const bestseller = require('../Controllers/Carousel_item/bestseller_list.js');
const featureitem = require('../Controllers/Carousel_item/featureitem_list.js');


router.get('/newarrival',newarrival)
router.get('/bestseller',bestseller)
router.get('/featureitem',featureitem)


module.exports = router