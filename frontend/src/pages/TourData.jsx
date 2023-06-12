import React, { useState, useRef, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { AuthContext } from '../context/AuthContext'
import '../styles/tourdata.css'
import {
  faDollarSign,
  faLocationDot,
  faStar,
  faRoute,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'

const TourData = () => {
  const id = useParams().id
  const reviewRef = useRef('')
  const [tourRating, setTourRating] = useState(null)
  const [reviewsData, setReviewsData] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const { user } = useContext(AuthContext)

  const url = `${import.meta.env.VITE_LOCAL_URL}/tours/${id}`

  const { loading, error, data: tour } = useFetch(url)

  const {
    title,
    country,
    city,
    description,
    duration,
    maxGroupSize,
    price,
    reviews,
    images,
  } = tour

  // Reviews are stored as an array of review IDs in the tour document. We need to fetch each review document and store it in the reviews state
  useEffect(() => {
    if (!reviews) return // Return if there are no reviews
    const fetchReviews = async () => {
      const fetchedReviews = await Promise.all(
        reviews.map(async review => {
          const response = await fetch(
            `${import.meta.env.VITE_LOCAL_URL}/reviews/${review}`
          )
          const reviewData = await response.json()
          return reviewData.data
        })
      )
      setReviewsData(fetchedReviews)
      // Calculate average rating
      setAvgRating(
        fetchedReviews.reduce((acc, curr) => acc + curr.rating, 0) /
          fetchedReviews.length
      )
    }

    fetchReviews()
  }, [tour])

  if (isNaN(avgRating)) setAvgRating(0) // If avgRating is NaN, set it to 0. Avoids displaying NaN in the UI when there are no reviews

  const handleSubmit = async e => {
    e.preventDefault()

    const review = reviewRef.current.value

    console.log(review)

    try {
      if (!user || user === null || user === undefined) {
        toast.error('Please login to submit a review', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } else {
        if (review === '') {
          toast.error('Please enter a review', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          return
        }

        const reviewData = {
          userId: user.id,
          tourId: id,
          review,
          rating: tourRating,
        }

        const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/reviews/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reviewData),
        }).then(res => res.json())

        if (!res.ok) {
          toast.error('Something went wrong. Please try again later', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }

        // Fetch the newly created review and add it to the reviews state
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URL}/reviews/${res.data._id}`
        )
        const newReview = await response.json()
        setReviewsData(prevReviews => [...prevReviews, newReview.data])

        // Calculate the new average rating
        setAvgRating(
          reviewsData.reduce((acc, curr) => acc + curr.rating, 0) /
            reviewsData.length
        )

        // Reset the review input field
        reviewRef.current.value = ''

        // Reset the tour rating
        setTourRating(null)

        toast.success('Review submitted successfully', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Scroll to top of page when component mounts or when tour state changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])

  return (
    <section>
      <ToastContainer />
      <div className='container'>
        {loading && <h4 className='text-center'>Loading...</h4>}
        {error && <h4 className='text-center'>{error}</h4>}
        {!loading && !error && (
          <div className='row'>
            <div className='col-lg-8'>
              <div className='tour-data'>
                <img src={images} alt='' />

                <div className='tour-info'>
                  <h2>{title}</h2>
                  <div className='rating-container'>
                    <span className='tour-rating'>
                      <FontAwesomeIcon icon={faStar} />{' '}
                      {avgRating === 0 ? null : avgRating}
                      {avgRating === 0 ? (
                        'Not rated'
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span id='country'>
                      <FontAwesomeIcon icon={faLocationDot} /> {country}
                    </span>
                  </div>

                  <div className='tour-details'>
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} /> {city}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faDollarSign} /> {price}/ per
                      person
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faRoute} /> {duration} days
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faUserGroup} /> {maxGroupSize}{' '}
                      people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{description}</p>
                </div>

                <div className='tour-reviews'>
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <span
                        className={`star ${tourRating >= 1 ? 'filled' : ''}`}
                        onClick={() => setTourRating(1)}
                      >
                        1
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span
                        className={`star ${tourRating >= 2 ? 'filled' : ''}`}
                        onClick={() => setTourRating(2)}
                      >
                        2
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span
                        className={`star ${tourRating >= 3 ? 'filled' : ''}`}
                        onClick={() => setTourRating(3)}
                      >
                        3
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span
                        className={`star ${tourRating >= 4 ? 'filled' : ''}`}
                        onClick={() => setTourRating(4)}
                      >
                        4
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span
                        className={`star ${tourRating === 5 ? 'filled' : ''}`}
                        onClick={() => setTourRating(5)}
                      >
                        5
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                    </div>
                    <div className='review-input-container'>
                      <textarea
                        placeholder='Write your review here'
                        name='review'
                        id='review'
                        cols='30'
                        rows='5'
                        ref={reviewRef}
                      ></textarea>
                      <button type='submit' className='btn primary__btn'>
                        Submit
                      </button>
                    </div>
                  </form>

                  <ul className='reviews-list'>
                    {reviewsData?.map(review => (
                      <div key={review._id} className='review-item'>
                        <img src='' alt='userAvatar' />
                        <div className='w100'>
                          <div className='user-data'>
                            {/* If user is not logged in, display Anonymous */}
                            <h5>
                              {review.userId?.username
                                ? review.userId.username
                                : 'Anonymous'}
                            </h5>
                            <p>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <span className='user-review-rating'>
                            {review.rating} <FontAwesomeIcon icon={faStar} />
                          </span>
                        </div>
                        <p>{review.review}</p>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              {/*<BookingForm tour={tour} avgRating={avgRating} />*/}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default TourData
