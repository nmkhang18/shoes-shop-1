const express = require('express')
const controller = require('../controllers/thongke.controller')
const router = express.Router()
const { dangnhapadmin } = require('../middlewares/auth.middlewares')


router.get('/:year/:month', controller.getByMonth)



module.exports = router
