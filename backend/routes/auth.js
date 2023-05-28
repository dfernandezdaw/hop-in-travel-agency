const express = require('express')
const { login, register, verifyEmail } = require('../controllers/auth')

const router = express.Router()

// Route to login
router.post('/login', login)

// Route to register
router.post('/register', register)

// Route to verify email
router.get('/verify-email/:token', verifyEmail)

module.exports = router
