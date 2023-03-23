const express = require('express')
const controller = require('../controllers/danhmuc.controller')
const router = express.Router()
const { dangnhapadmin } = require('../middlewares/auth.middlewares')


router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.put('/:id', dangnhapadmin, controller.editById)
router.put('/disable/:id', dangnhapadmin, controller.disableById)
router.put('/delete/:id', dangnhapadmin, controller.deleteById)

router.post('/', controller.add)


module.exports = router
