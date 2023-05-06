const Booking = require('../models/Booking')
const Tour = require('../models/Tour')
const User = require('../models/User')

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tourId')
      .populate('userId')
      .exec()
    res.json({ message: 'Bookings found', data: bookings })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Get single booking
const getBooking = async (req, res) => {
  const { id } = req.params
  try {
    const booking = await Booking.findById(id)
      .populate('tourId')
      .populate('userId')
      .exec()
    res.json({ message: 'Booking found', data: booking })
  } catch (error) {
    res.status(404).json({ message: 'Booking not found' })
  }
}

// Create booking
const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body)
  try {
    const booking = await newBooking.save()
    res.json({ message: 'Booking created succesfully', data: booking })
  } catch (error) {
    res.status(400).json({ message: 'Failed to create booking', error: error })
  }
}

// Update booking payment status
const updateBooking = async (req, res) => {
  const { id } = req.params
  const { paid } = req.body
  if (paid === true) {
    try {
      // Get booking and see if it is paid
      const booking = await Booking.findById(id)
      if (booking.paid) {
        return res.status(400).json({ message: 'Booking is already paid' })
      } else {
        const updateBooking = await Booking.findByIdAndUpdate(id, paid, {
          new: true,
        })
        res.json({
          message: 'Booking updated successfully',
          data: updateBooking,
        })
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Failed to update booking', error: error })
    }
  } else {
    res.status(400).json({ message: 'Booking is not paid' })
  }
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
}
