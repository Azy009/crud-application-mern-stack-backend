const express = require('express')
const addtocart = require('../Controllers/cart/addtocart')
const addtocartlist = require('../Controllers/cart/addtocartlist')
const addtocartdelete = require('../Controllers/cart/addtocartdelete')
const cartlist = require('../Controllers/cart/cartlist')
const authenticateToken = require('../middlewares/verifytoken')
const updateCartQuantity = require('../Controllers/cart/frontend/updateCartQuantity')
const cartcount = require('../Controllers/cart/frontend/cartcount')
const checkuser = require('../middlewares/checkuser')
const router = express.Router()

router.post('/',authenticateToken,addtocart)
router.get('/',cartlist)
router.get('/addtocartlist',checkuser,addtocartlist)
router.get('/cartcount',checkuser,cartcount)
router.post('/updateqty',authenticateToken,updateCartQuantity)
router.delete('/:cart_id',addtocartdelete)

module.exports = router