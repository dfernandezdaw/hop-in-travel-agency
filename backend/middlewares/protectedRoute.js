const express = require('express')
const jwt = require('jsonwebtoken')

const protectedRoute = express.Router()

// Middleware to protect routes from unauthorized access
protectedRoute.use((req, res, next) => {
  let token = req.headers['authorization']
  if (token) {
    token = token.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided',
    })
  }
})

module.exports = protectedRoute
