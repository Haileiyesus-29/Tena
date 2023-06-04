const express = require('express')
const router = express.Router()
const validateForm = require('../validations/validateForm')
const validateAccount = require('../validations/validateAccount')
const authenticate = require('../middlewares/authenticate')
const {
   createUser,
   getUser,
   updateUser,
   deleteUser,
   getAllUsers,
} = require('../controllers/user.controller')

// Get all users
router.get('/', getAllUsers)

// Create a new user
router.post('/', validateForm, createUser)

// Get user details
router.get('/:userId', getUser)

// Update user information
router.put('/me', authenticate, updateUser)

// Delete a user
router.delete('/me', authenticate, deleteUser)

module.exports = router
