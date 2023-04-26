const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    images: {
      type: Array,
      default: [],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Max group size is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: mongoose.Types.ObjectId,
      ref: 'Review',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tour', tourSchema)
