const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must can not be more than 5'],
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
