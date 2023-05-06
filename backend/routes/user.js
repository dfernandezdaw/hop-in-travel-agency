const express = require('express')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user')

const router = express.Router()

// Route to get all users
router.get('/', getUsers)

// Route to get single user
router.get('/:id', getUser)

// Route to create user
router.post('/', createUser)

// Route to update user
router.put('/:id', updateUser)

// Route to delete user
router.delete('/:id', deleteUser)

module.exports = router
