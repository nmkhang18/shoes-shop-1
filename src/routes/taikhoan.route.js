const express = require('express')
const controller = require('../controllers/taikhoan.controller')
const router = express.Router()
const { dangnhap, checkId } = require('../middlewares/auth.middlewares')

router.post('/otp', controller.sendOTP)
router.post('/dangnhap', controller.dangnhap)
router.post('/dangky', controller.dangky)
router.put('/', dangnhap, controller.editInfo)
router.put('/changepassword', dangnhap, controller.editPassword)


module.exports = router


