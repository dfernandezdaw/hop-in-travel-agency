const express = require('express')
const { login, register, verifyEmail } = require('../controllers/auth')

const router = express.Router()

// Route to login
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *             example:
 *               email: test@example.com
 *               password: test123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: User is not authorized
 *       403:
 *         description: User is not verified
 *       404:
 *         description: User does not exist
 *       400:
 *         description: Bad request
 */
router.post('/login', login)

// Route to register
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *             example:
 *               username: testuser
 *               email: test@example.com
 *               password: test123
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.post('/register', register)

// Route to verify email
/**
 * @swagger
 * /api/v1/auth/verify-email/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [Authentication]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Verification token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token or user not found
 *     security: []
 */
router.get('/verify-email/:token', verifyEmail)

module.exports = router
