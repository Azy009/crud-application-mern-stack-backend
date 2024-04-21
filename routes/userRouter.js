const express = require('express')
const router = express.Router()
const user_creation = require('../Controllers/user/user_creation.js');
const userlist = require('../Controllers/user/userlist.js');
const usersingle = require('../Controllers/user/usersingle.js');
const updateuser = require('../Controllers/user/updateuser.js');
const deleteuser = require('../Controllers/user/deleteuser.js');


router.get('/',userlist)
router.get('/:id',usersingle)
router.delete('/:id',deleteuser)
router.post('/user_creation',user_creation)
router.patch('/:id',updateuser)


module.exports = router