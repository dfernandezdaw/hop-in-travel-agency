const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (!user.verified) {
        return res.status(403).json({ message: 'User is not verified' })
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (validPassword) {
        // Create a token with the user id, name, and email as payload
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SECRET, // This is the secret key used to sign the token.
          {
            expiresIn: '24h',
          }
        )
        // Return JSON with token and user info
        res.json({
          token,
          id: user._id,
          name: user.name,
          email: user.email,
        })
      } else {
        res.status(401).json({ message: 'Invalid password' })
      }
    } else {
      res.status(404).json({ message: 'User does not exist' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

const register = async (req, res) => {
  try {
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      const savedUser = await newUser.save()

      // Create a token for verification
      const token = new Token({
        userId: savedUser._id,
        token: crypto.randomBytes(16).toString('hex'),
      })

      // Save the token
      await token.save()

      console.log('Token saved')

      // Compose the confirmation email
      const mailOptions = {
        from: process.env.EMAIL,
        to: savedUser.email,
        subject: 'Email verification',
        html: `<h1>Welcome to Hop In!</h1><p>Click on the link below to verify your email</p><br><a href=${process.env.CLIENT_URL}/verify-email/${token.token}>Verify email</a>`,
      }

      // Send the email. If email sending fails, delete the user record and return an error response
      try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent')
      } catch (error) {
        console.log('Email sending failed:', error)
        await User.findByIdAndRemove(savedUser._id).exec()
        await Token.findOneAndRemove({ userId: savedUser._id }).exec()
        return next(new Error('Failed to send email'))
      }

      // Return json with savedUser and success message
      res.json({ message: 'User created', user: savedUser })
    } else {
      res.status(409).json({ message: 'User already exists' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

const verifyEmail = async (req, res) => {
  try {
    // Find the token
    const tokenDoc = await Token.findOne({ token: req.params.token })
    if (!tokenDoc) {
      res.status(400).json({ message: 'Invalid token' })
    } else {
      // Find the user
      const user = await User.findById(tokenDoc.userId)
      if (!user) {
        res.status(400).json({ message: 'User not found' })
      } else if (user.verified) {
        res.status(400).json({ message: 'Email already verified' })
      } else {
        // Update user and set verified to true
        await User.updateOne({ _id: user._id }, { verified: true })
        res.json({ message: 'Email verified' })
      }
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

module.exports = {
  login,
  register,
  verifyEmail,
}
