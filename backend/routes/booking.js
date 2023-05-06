const express = require('express')
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
} = require('../controllers/booking')

const router = express.Router()

// Route to get all bookings
router.get('/', getBookings)

// Route to get single booking
router.get('/:id', getBooking)

// Route to create booking
router.post('/', createBooking)

// Route to update booking
router.put('/:id', updateBooking)

module.exports = router
