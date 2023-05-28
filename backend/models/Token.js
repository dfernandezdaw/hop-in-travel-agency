const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'Token is required'],
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Token', tokenSchema)
