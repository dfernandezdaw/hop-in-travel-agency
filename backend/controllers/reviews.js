const Tour = require('../models/Tour')
const Review = require('../models/Review')

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('tourId')
      .populate('userId')
      .exec()
    res.json({ message: 'Reviews found', data: reviews })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Get single review
const getReview = async (req, res) => {
  const { id } = req.params
  try {
    const review = await Review.findById(id)
      .populate('tourId')
      .populate('userId')
      .exec()
    res.json({ message: 'Review found', data: review })
  } catch (error) {
    res.status(404).json({ message: 'Review not found' })
  }
}

// Create review
const createReview = async (req, res) => {
  const newReview = new Review(req.body)
  try {
    const review = await newReview.save()

    // Update tour with new review
    const tour = await Tour.findById(review.tourId)
    if (!tour) {
      return res
        .status(404)
        .json({ message: 'Cannot create Review. Tour not found' })
    } else {
      tour.reviews.push(review._id)
      await tour.save()
    }

    res.json({ message: 'Review created succesfully', data: review })
  } catch (error) {
    res.status(400).json({ message: 'Failed to create review', error: error })
  }
}

//Delete review
const deleteReview = async (req, res) => {
  const { id } = req.params
  try {
    const review = await Review.findByIdAndDelete(id)

    // Update tour with deleted review
    const tour = await Tour.findById(review.tourId)
    if (!tour) {
      return res
        .status(404)
        .json({ message: 'Cannot delete Review. Tour not found' })
    } else {
      tour.reviews.pull(review._id)
      await tour.save()
    }

    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete review', error: error })
  }
}

module.exports = {
  getReviews,
  getReview,
  createReview,
  deleteReview,
}
