const express = require('express')
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
} = require('../controllers/reviews')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review management endpoints
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Reviews found
 *       400:
 *         description: Bad request
 */
router.get('/', getReviews)

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get single review
 *     tags: [Review]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 */
router.get('/:id', getReview)

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Create review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ReviewInput'
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Failed to create review
 */
router.post('/', createReview)

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     tags: [Review]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       400:
 *         description: Failed to delete review
 */
router.delete('/:id', deleteReview)

module.exports = router
