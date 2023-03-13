const express = require('express')
const controller = require('../controllers/donhang.controller')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)

router.post('/', controller.add)


module.exports = router