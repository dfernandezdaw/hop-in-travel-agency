import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { useEffect, useState } from 'react'
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './tour-card.css'

const TourCard = ({ tour }) => {
  const { _id, title, city, images, price, featured, reviews } = tour
  const [rating, setRating] = useState([])

  //console.log(reviews)

  useEffect(() => {
    const fetchRatings = async () => {
      const uniqueReviews = [...new Set(reviews)]
      const fetchedRatings = await Promise.all(
        uniqueReviews.map(async review => {
          const response = await fetch(
            `${import.meta.env.VITE_LOCAL_URL}/reviews/${review}`
          )
          const reviewData = await response.json()
          return reviewData.data.rating
        })
      )
      setRating(prevRatings => [...prevRatings, ...fetchedRatings])
    }

    fetchRatings()
  }, [])

  //Calculate average rating
  let avgRating = rating.reduce((acc, curr) => acc + curr, 0) / rating.length
  // If avgRating is NaN, set it to 0. Avoids displaying NaN in the UI when there are no reviews
  isNaN(avgRating) && (avgRating = 0)

  return (
    <div className='tour-card'>
      <Card>
        <div className='tour-img'>
          <img src={images[0]} alt='Image of the tour' />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className='card-top'>
            <span className='tour-location'>
              <FontAwesomeIcon icon={faLocationDot} /> {city}
            </span>
            <span className='tour-rating'>
              <FontAwesomeIcon icon={faStar} />{' '}
              {avgRating === 0 ? null : avgRating}{' '}
              {rating.length === 0 ? (
                'Not rated'
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>
          <h5 className='tour-title'>
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className='card-bottom'>
            <h5>
              {price}$ <span> /per person</span>
            </h5>
            <button className='booking-btn'>
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default TourCard