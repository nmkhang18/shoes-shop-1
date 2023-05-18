const express = require('express')
const controller = require('../controllers/taikhoan.controller')
const router = express.Router()
const { dangnhap, checkId } = require('../middlewares/auth.middlewares')

router.post('/otp', controller.sendOTP)
router.post('/forgot/otp', controller.forgotPWOTP)
router.post('/forgot/changepassword', controller.changePWviaOTP)
router.post('/dangnhap', controller.dangnhap)
router.post('/dangky', controller.dangky)
router.put('/', dangnhap, controller.editInfo)
router.put('/editDC', dangnhap, controller.editDC)
router.put('/changepassword', dangnhap, controller.editPassword)
router.post('/checkFOTP', controller.checkFOTP)
router.get('/', dangnhap, controller.getInfo)

module.exports = router