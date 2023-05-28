const express = require('express')
const router = express.Router()
const validateUserCreatingForm = require('../validations/validateUserCreatingForm')
const verifyUserLogin = require('../middlewares/verifyUserLogin')
const authenticateUser = require('../middlewares/authenticateUser')
const {
   createUser,
   getUser,
   updateUser,
   deleteUser,
   getAllUsers,
   loginUser,
} = require('../controllers/user.controller')

// Get all users
router.get('/', getAllUsers)

// Create a new user
router.post('/', validateUserCreatingForm, createUser)

// Login user
router.post('/login', verifyUserLogin, loginUser)

// Get user details
router.get('/:userId', getUser)

// Update user information
router.put('/:userId', authenticateUser, updateUser)

// Delete a user
router.delete('/:userId', authenticateUser, deleteUser)

module.exports = router
