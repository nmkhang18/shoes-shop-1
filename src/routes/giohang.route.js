const express = require('express')
const controller = require('../controllers/giohang.controller')
const { dangnhap } = require('../middlewares/auth.middlewares')

const router = express.Router()

router.get('/', dangnhap, controller.getAll)
router.post('/', dangnhap, controller.add)
router.put('/', dangnhap, controller.editSL)





module.exports = router