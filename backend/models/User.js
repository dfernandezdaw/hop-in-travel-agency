const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      //required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    profilePicture: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
