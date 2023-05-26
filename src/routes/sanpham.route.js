const express = require('express')
const controller = require('../controllers/sanpham.controller')
const { dangnhapadmin } = require('../middlewares/auth.middlewares')

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.put('/:id', dangnhapadmin, controller.editById)
// router.put('/disable/:id', dangnhapadmin, controller.disableById)
router.put('/delete/:id', dangnhapadmin, controller.deleteById)

router.post('/', controller.add)

router.put('/:id/:ms', controller.editMS)



module.exports = router