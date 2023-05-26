const express = require('express')
const router = express.Router()
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
router.post('/', createUser)

// Get user details
router.get('/:userId', getUser)

// Update user information
router.put('/:userId', updateUser)

// Delete a user
router.delete('/:userId', deleteUser)

module.exports = router
