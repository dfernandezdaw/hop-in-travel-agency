const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    bookingPrice: {
      type: Number,
      required: [true, 'Booking price is required'],
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
    },
    phone: {
      type: Number,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
