const express = require('express')
const controller = require('../controllers/thongke.controller')
const router = express.Router()
const { dangnhapadmin } = require('../middlewares/auth.middlewares')


router.get('/:month', controller.getAll)



module.exports = router
