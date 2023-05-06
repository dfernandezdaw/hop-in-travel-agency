const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (validPassword) {
        // Create a token with the user id, name and email as payload
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
        // Return json with token and user info
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
      // Return json with savedUser and success message
      res.json({ message: 'User created', user: savedUser })
    } else {
      res.status(409).json({ message: 'User already exists' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

module.exports = {
  login,
  register,
}
