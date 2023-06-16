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
      data: tours,
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

// Create tour with file upload
const createTour = async (req, res) => {
  const newTour = new Tour(req.body)
  try {
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        newTour.images.push(
          `https://hop-in-travel-agency-production.up.railway.app/uploads/${file.filename}`
        )
      })
    }
    const tour = await newTour.save()
    res.json({ message: 'Tour created successfully', data: tour })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create tour', error: error.message })
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

//Search tours by country name or city name (case insensitive)
const searchTours = async (req, res) => {
  const { location } = req.body
  const query = {
    // $regex is used to perform a regular expression search (i for case insensitive) $or is used to perform a logical OR operation
    $or: [
      { country: { $regex: location, $options: 'i' } },
      { city: { $regex: location, $options: 'i' } },
    ],
  }
  try {
    const tours = await Tour.find(query)
    res.json({ message: 'Tours found', data: tours })
  } catch (error) {
    res.status(404).json({ message: 'Tours not found' })
  }
}

const searchToursByCityDurationAndGroupSize = async (req, res) => {
  const city = new RegExp(req.query.city, 'i')
  const duration = parseInt(req.query.duration)
  const groupSize = parseInt(req.query.groupSize)
  try {
    const tours = await Tour.find({
      city: city,
      duration: { $gte: duration },
      maxGroupSize: { $gte: groupSize },
    })
    res.json({ message: 'Tours found', data: tours })
  } catch (error) {
    res.status(404).json({ message: 'Tours not found' })
  }
}

const searchFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
    res.json({ message: 'Tours found', data: tours })
  } catch (error) {
    res.status(404).json({ message: 'Tours not found' })
  }
}

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  searchTours,
  searchToursByCityDurationAndGroupSize,
  searchFeaturedTours,
}
