const express = require('express')
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
} = require('../controllers/reviews')

const router = express.Router()

// Route to get all reviews
router.get('/', getReviews)

// Route to get single review
router.get('/:id', getReview)

// Route to create review
router.post('/', createReview)

// Route to delete review
router.delete('/:id', deleteReview)

module.exports = router
