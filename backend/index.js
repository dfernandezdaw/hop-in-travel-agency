const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
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

app.listen(port, () => {
  connect()
  console.log(`Server is running on port: ${port}`)
})
