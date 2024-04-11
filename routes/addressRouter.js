const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/verifytoken.js');
const addresslist = require('../Controllers/Address/addresslist.js');
const frontend_addresslist = require('../Controllers/Address/frontend/frontend_addresslist.js');
const createaddress = require('../Controllers/Address/createaddress.js');
const addresssingle = require('../Controllers/Address/address_single.js');
const deleteaddress = require('../Controllers/Address/deleteaddress.js');
const updateaddress = require('../Controllers/Address/updateaddress.js');

router.get('/',addresslist)
router.get('/userid',authenticateToken,frontend_addresslist)
router.get('/:id',addresssingle)
router.delete('/:id',deleteaddress)
router.post('/',authenticateToken,createaddress)
router.patch('/:id',authenticateToken,updateaddress)


module.exports = router