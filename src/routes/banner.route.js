const express = require('express')
const controller = require('../controllers/banner.controller')
const router = express.Router()


router.get('/', controller.getAll)
router.post('/', controller.add)
router.put('/enable/:id', controller.enable)
router.put('/disable/:id', controller.disable)



module.exports = router