const express = require('express')
const router = express.Router()
const validateAccount = require('../validations/validateAccount')

router.post('/', validateAccount)

module.exports = router
