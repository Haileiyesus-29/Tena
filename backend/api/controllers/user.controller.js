const User = require('../models/user.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')

// Get all users
async function getAllUsers(req, res, next) {
   try {
      const users = await User.find().select('email name')
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
      const token = await generateToken({ id: user._id, accountType: 'user' })
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

// Update user information
async function updateUser(req, res, next) {
   try {
      const { name, password } = req.body
      const update = {}
      let nameErrors = []
      let passwordErrors = []

      if (password) {
         passwordErrors = passwordValidator(password)
         update.password = await hashPassword(password)
      }
      if (name) {
         nameErrors = nameValidator(name)
         update.name = name
      }

      const errors = [...nameErrors, ...passwordErrors]
      if (errors.length > 0)
         return next({ errors, message: 'Bad Request', status: 400 })

      const updatedUser = await User.findByIdAndUpdate(req.userId, update, {
         new: true,
      }).select('-password')
      if (!updatedUser)
         return next({ message: 'Internal server Error', status: 500 })
      res.json({ message: 'User updated successfully', user: updatedUser })
   } catch (error) {
      next(error)
   }
}

// Delete a user
async function deleteUser(req, res, next) {
   try {
      const deletedUser = await User.findByIdAndDelete(req.userId).select(
         '-password'
      )
      if (!deletedUser)
         return next({ message: 'Internal server Error', status: 500 })
      res.status(204).json({ message: 'User deleted successfully' })
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
