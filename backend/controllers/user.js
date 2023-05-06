const User = require('../models/User')

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

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, password, profilePicture } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password, profilePicture },
      { new: true }
    )
    res.json({ message: 'User updated successfully', data: user })
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error })
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
