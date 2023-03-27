const express = require('express')
const controller = require('../controllers/nguoidung.controller')
const router = express.Router()

router.get('/', controller.getAll)
router.put('/:id', controller.disableById)




module.exports = router
