const express = require('express')
const controller = require('../controllers/danhmuc.controller')
const router = express.Router()
const { dangnhapadmin } = require('../middlewares/auth.middlewares')


router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.put('/:id', dangnhapadmin, controller.editById)
router.put('/disable/:id', dangnhapadmin, controller.disableById)
router.delete('/:id', dangnhapadmin, controller.deleteById)

router.post('/', controller.add)
router.post('/sanpham/:id', controller.addDM_SP)
router.put('/sanpham/:id', controller.deleteDM_SP)




module.exports = router
