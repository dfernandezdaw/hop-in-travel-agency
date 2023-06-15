const express = require('express')
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  getUserBookings,
  deleteBooking,
} = require('../controllers/booking')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking management endpoints
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Bookings found
 *       400:
 *         description: Bad request
 */
router.get('/', getBookings)

/**
 * @swagger
 * /api/v1/bookings/user/{id}:
 *   get:
 *     summary: Get all bookings for a specific user
 *     tags: [Booking]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bookings found
 *       400:
 *         description: Bad request
 */
router.get('/user/:id', getUserBookings)

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: Get single booking
 *     tags: [Booking]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 */
router.get('/:id', getBooking)

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Failed to create booking
 */
router.post('/', createBooking)

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Booking]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       400:
 *         description: Failed to delete booking
 */
router.delete('/:id', deleteBooking)

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   put:
 *     summary: Update booking payment status
 *     tags: [Booking]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paid:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Failed to update booking
 *       401:
 *         description: Booking is not paid
 *       409:
 *         description: Booking is already paid
 */
router.put('/:id', updateBooking)

module.exports = router
