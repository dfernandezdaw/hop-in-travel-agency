const express = require('express')
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
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

module.exports = router
