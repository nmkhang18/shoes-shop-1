const express = require('express')
const controller = require('../controllers/donhang.controller')
const { dangnhap } = require('../middlewares/auth.middlewares')

const router = express.Router()

router.get('/', dangnhap, controller.getAll)
router.post('/', dangnhap, controller.add)





module.exports = router