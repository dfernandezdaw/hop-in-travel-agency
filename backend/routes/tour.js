const express = require('express')
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  searchTours,
  searchToursByCityDurationAndGroupSize,
  searchFeaturedTours,
} = require('../controllers/tour')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Tour
 *   description: Tour management endpoints
 */

/**
 * @swagger
 * /api/v1/tours/search-main:
 *   get:
 *     summary: Search tours by city name, duration, and group size
 *     tags: [Tour]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City name
 *       - in: query
 *         name: duration
 *         schema:
 *           type: integer
 *         description: Tour duration (in days)
 *       - in: query
 *         name: groupSize
 *         schema:
 *           type: integer
 *         description: Maximum group size
 *     responses:
 *       200:
 *         description: Tours found
 *       404:
 *         description: Tours not found
 */
router.get('/search-main', searchToursByCityDurationAndGroupSize)

/**
 * @swagger
 * /api/v1/tours/featured:
 *   get:
 *     summary: Get featured tours
 *     tags: [Tour]
 *     responses:
 *       200:
 *         description: Tours found
 *       404:
 *         description: Tours not found
 */
router.get('/featured', searchFeaturedTours)

/**
 * @swagger
 * /api/v1/tours:
 *   get:
 *     summary: Get all tours
 *     tags: [Tour]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Current page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tours per page
 *     responses:
 *       200:
 *         description: Tours found
 *       400:
 *         description: Bad request
 */
router.get('/', getTours)

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   get:
 *     summary: Get single tour
 *     tags: [Tour]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Tour ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour found
 *       404:
 *         description: Tour not found
 */
router.get('/:id', getTour)

/**
 * @swagger
 * /api/v1/tours:
 *   post:
 *     summary: Create tour
 *     tags: [Tour]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TourInput'
 *     responses:
 *       200:
 *         description: Tour created successfully
 *       400:
 *         description: Failed to create tour
 */
router.post('/', createTour)

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   put:
 *     summary: Update tour
 *     tags: [Tour]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Tour ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TourInput'
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *       400:
 *         description: Failed to update tour
 *       404:
 *         description: Tour not found
 */
router.put('/:id', updateTour)

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   delete:
 *     summary: Delete tour
 *     tags: [Tour]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Tour ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *       400:
 *         description: Failed to delete tour
 *       404:
 *         description: Tour not found
 */
router.delete('/:id', deleteTour)

/**
 * @swagger
 * /api/v1/tours/search:
 *   post:
 *     summary: Search tours by country name or city name
 *     tags: [Tour]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/TourSearchInput'
 *     responses:
 *       200:
 *         description: Tours found
 *       404:
 *         description: Tours not found
 */
router.post('/search', searchTours)

module.exports = router
