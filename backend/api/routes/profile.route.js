const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const { saveProfile } = require('../controllers/profile.controller')
const uploadFile = require('../middlewares/uploadFile')

router.post('/', authenticate, uploadFile('image'), saveProfile)

module.exports = router
