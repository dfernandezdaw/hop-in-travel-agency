const express = require('express')
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  searchTours,
} = require('../controllers/tour')

const router = express.Router()

// Route to get all tours
router.get('/', getTours)

// Route to get single tour
router.get('/:id', getTour)

// Route to create tour
router.post('/', createTour)

// Route to update tour
router.put('/:id', updateTour)

// Route to delete tour
router.delete('/:id', deleteTour)

// Route to search tour by country name post
router.post('/search', searchTours)

module.exports = router
