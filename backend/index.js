const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const usersRoutes = require('./routes/user')
const tourRoutes = require('./routes/tour')
const bookingRoutes = require('./routes/booking')
const reviewsRoutes = require('./routes/reviews')
const authRoutes = require('./routes/auth')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(
  cors({
    origin: 'https://hop-in-travel-agency.vercel.app',
    credentials: true,
  })
)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
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

// Serve static files from the "public/uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

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

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hop In! Travel Agency API',
      version: '1.0.0',
      description: 'A REST API for a travel agency',
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
      },
    ],
  },
  apis: ['./routes/*.js'],
}

// Swagger documentation
const spec = swaggerjsdoc(options)
const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerui.serve, swaggerui.setup(spec))
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(spec)
  })

  console.log(
    `Swagger UI available at https://hop-in-travel-agency-production.up.railway.app/api/v1/docs`
  )
}

swaggerDocs(app, port)

app.listen(port, () => {
  connect()
  console.log(`Server is running on port: ${port}`)
})
