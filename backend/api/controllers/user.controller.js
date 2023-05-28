const User = require('../models/user.model')
const hashPassword = require('../helpers/hashUserPassword')
const generateToken = require('../helpers/generateToken')

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

      const hashedPassword = await hashPassword(password)
      const user = new User({
         name,
         email,
         password: hashedPassword,
      })
      await user.save()
      const token = await generateToken({ id: user._id })
      res.status(201).json({ message: 'User created successfully', token })
   } catch (error) {
      next(error)
   }
}

// Get user details
async function getUser(req, res, next) {
   try {
      const userId = req.params.userId

      const user = await User.findById(userId).select('email name')

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

// Login user
async function loginUser(req, res, next) {
   const { _id: id } = req.user
   const token = await generateToken({ id })
   res.json({ message: 'successfullly logged in', token })
}

// Update user information
async function updateUser(req, res, next) {
   try {
      const userId = req.params.userId
      const loggedUserId = req.user._id
      req.body.email = undefined
      const updates = req.body

      if (userId !== loggedUserId?.toString()) return next('Forbidden')
      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
         new: true,
      }).select('-password')

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
      const loggedUserId = req.user._id

      if (userId !== loggedUserId?.toString()) return next('Forbidden')
      const deletedUser = await User.findByIdAndDelete(userId).select(
         '-password'
      )

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
   loginUser,
}
