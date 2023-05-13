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
router.put('/changepassword', dangnhap, controller.editPassword)
router.post('/checkFOTP', controller.checkFOTP)
router.post('/test', async (req, res) => {
    console.log(req.files.file);
    console.log(req.body)
    let listHinh = []

    for (let i = 0; i < req.files.file.length; i++) {
        console.log();
        listHinh.push(await upload(res, req.files.file[i].data, `${req.body.TENSANPHAM}${i}`))
    }
    console.log(listHinh);
})

module.exports = router