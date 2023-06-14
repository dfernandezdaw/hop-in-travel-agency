const User = require('../models/User')
const bcrypt = require('bcrypt')

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Get single user
const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.json({ message: 'User found', data: user })
  } catch (error) {
    res.status(404).json({ message: 'User not found' })
  }
}

// Create user
const createUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.create({ username, email, password })
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Update user. Only update the parameters that are passed in the request body
const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, password } = req.body

  try {
    if (req.file) {
      const profilePicture = req.file.filename
      req.body.profilePicture = profilePicture
    }

    // If a new password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      req.body.password = hashedPassword
    }

    // Build updated user with data provided in request body
    const updatedUser = {
      username,
      email,
      profilePicture: req.body.profilePicture,
    }

    // If a new password is provided, add it to updatedUser
    if (password) {
      updatedUser.password = req.body.password
    }

    // Save updated user to the database
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true })

    // Create a new object with selected user properties. This is the object that will be sent in the response
    const sanitizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    }

    res.json({ message: 'User updated successfully', data: sanitizedUser })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to update user', error: error.message })
  }
}

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
