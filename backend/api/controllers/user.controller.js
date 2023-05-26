const User = require('../models/user.model')

// Get all users
async function getAllUsers(req, res, next) {
   try {
      const users = await User.find()
      res.json(users)
   } catch (error) {
      next(error)
   }
}

// Create a new user
async function createUser(req, res, next) {
   try {
      const { name, email, password } = req.body

      const user = new User({
         name,
         email,
         password,
      })

      await user.save()

      res.status(201).json({ message: 'User created successfully', user })
   } catch (error) {
      next(error)
   }
}

// Get user details
async function getUser(req, res, next) {
   try {
      const userId = req.params.userId

      const user = await User.findById(userId)

      if (!user) {
         const error = new Error('User not found')
         error.statusCode = 404
         throw error
      }

      res.json(user)
   } catch (error) {
      next(error)
   }
}

// Update user information
async function updateUser(req, res, next) {
   try {
      const userId = req.params.userId
      const updates = req.body

      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
         new: true,
      })

      if (!updatedUser) {
         const error = new Error('User not found')
         error.statusCode = 404
         throw error
      }

      res.json({ message: 'User updated successfully', user: updatedUser })
   } catch (error) {
      next(error)
   }
}

// Delete a user
async function deleteUser(req, res, next) {
   try {
      const userId = req.params.userId

      const deletedUser = await User.findByIdAndDelete(userId)

      if (!deletedUser) {
         const error = new Error('User not found')
         error.statusCode = 404
         throw error
      }

      res.json({ message: 'User deleted successfully' })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllUsers,
   createUser,
   getUser,
   updateUser,
   deleteUser,
}
