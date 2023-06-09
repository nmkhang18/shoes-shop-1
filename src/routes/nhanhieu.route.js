const express = require('express')
const controller = require('../controllers/nhanhieu.controller')
const { dangnhapadmin } = require('../middlewares/auth.middlewares')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.put('/:id', dangnhapadmin, controller.editById)
router.put('/disable/:id', dangnhapadmin, controller.disableById)
router.delete('/:id', dangnhapadmin, controller.deleteById)

router.post('/', controller.add)


module.exports = router