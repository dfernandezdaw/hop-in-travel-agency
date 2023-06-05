const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const usersRoutes = require('./routes/user')
const tourRoutes = require('./routes/tour')
const bookingRoutes = require('./routes/booking')
const reviewsRoutes = require('./routes/reviews')
const authRoutes = require('./routes/auth')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Connect to MongoDB
mongoose.set('strictQuery', false)
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`)
  }
}

// Message with the method, path and actualtime
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${new Date().toLocaleTimeString()}`)
  next()
})

// Routes
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/tours', tourRoutes)
app.use('/api/v1/bookings', bookingRoutes)
app.use('/api/v1/reviews', reviewsRoutes)
app.use('/api/v1/auth', authRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Internal Server Error' })
})

app.listen(port, () => {
  connect()
  console.log(`Server is running on port: ${port}`)
})
