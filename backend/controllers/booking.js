const Booking = require('../models/Booking')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

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

// Get all bookings for a specific user. Data is paginated
const getUserBookings = async (req, res) => {
  const { id } = req.params
  try {
    const { page, limit } = req.query
    const bookings = await Booking.find({ userId: id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('tourId')
      .populate('userId')
      .exec()
    const count = await Booking.countDocuments({ userId: id })
    res.json({
      data: bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
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

    // Send email to user with booking details
    const mailOptions = {
      from: process.env.EMAIL,
      to: booking.userId.email,
      subject: 'Booking confirmation',
      text: `Thank you for booking ${booking.tourId.name}. The total cost is ${booking.price}.`,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })

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
  getUserBookings,
}
