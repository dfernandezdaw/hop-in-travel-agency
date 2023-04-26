const jwt = require('jsonwebtoken')

// Verify token from cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' })
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' })
      } else {
        req.userId = decoded.id
        next()
      }
    })
  }
}

// Verify user is the owner of the resource. Usefull for update and delete operations also to show booking history of a user. Admin can access all resources.
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userId === req.params.id || req.user.role === 'admin') {
      next()
    } else {
      return res.status(403).json({ message: 'Unauthorized' })
    }
  })
}

// Verify user is admin or not
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next()
    } else {
      return res.status(403).json({ message: 'Unauthorized' })
    }
  })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }
