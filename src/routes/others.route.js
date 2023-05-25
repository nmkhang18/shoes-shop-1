const express = require('express')
const controller = require('../controllers/others.controller')

const router = express.Router()

router.get('/color', controller.getColor)
router.get('/size', controller.getSize)

module.exports = router