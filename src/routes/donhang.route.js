const express = require('express')
const controller = require('../controllers/donhang.controller')
const { dangnhap } = require('../middlewares/auth.middlewares')

const router = express.Router()

router.get('/', dangnhap, controller.getAll)
router.get('/admin', controller.getAllAdm)
router.get('/admin/:id', controller.getAllAdmCT)
router.post('/', dangnhap, controller.add)
router.put('/:id', dangnhap, controller.cancelDH)
router.put('/admin/:id', controller.changeTT)






module.exports = router