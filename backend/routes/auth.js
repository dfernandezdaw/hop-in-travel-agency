const express = require('express')
const { login, register } = require('../controllers/auth')

const router = express.Router()

// Route to login
router.post('/login', login)

// Route to register
router.post('/register', register)

module.exports = router
