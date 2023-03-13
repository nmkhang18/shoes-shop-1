const express = require('express')
const controller = require('../controllers/nhanhieu.controller')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.put('/:id', controller.editById)
router.put('/disable/:id', controller.disableById)
router.put('/delete/:id', controller.deleteById)

router.post('/', controller.add)


module.exports = router