const Tour = require('../models/Tour')

// Get all tours paginated
const getTours = async (req, res) => {
  try {
    const { page, limit } = req.query
    const tours = await Tour.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
    const count = await Tour.countDocuments()
    res.json({
      tours,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Get single tour
const getTour = async (req, res) => {
  const { id } = req.params
  try {
    const tour = await Tour.findById(id)
    res.json({ message: 'Tour found', data: tour })
  } catch (error) {
    res.status(404).json({ message: 'Tour not found' })
  }
}

// Create tour
const createTour = async (req, res) => {
  const newTour = new Tour(req.body)
  try {
    const tour = await newTour.save()
    res.json({ message: 'Tour created succesfully', data: tour })
  } catch (error) {
    res.status(400).json({ message: 'Failed to create tour', error: error })
  }
}

// Update tour
const updateTour = async (req, res) => {
  const { id } = req.params
  try {
    const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true })
    res.json({ message: 'Tour updated successfully', data: tour })
  } catch (error) {
    res.status(400).json({ message: 'Failed to update tour', error: error })
  }
}

// Delete tour
const deleteTour = async (req, res) => {
  const { id } = req.params
  try {
    const tour = await Tour.findByIdAndDelete(id)
    res.json({ message: 'Tour deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
}
