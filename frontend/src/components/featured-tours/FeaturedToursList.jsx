import React from 'react'
import TourCard from '../../shared/TourCard'
import useFetch from './../../hooks/useFetch'
import './featured-tour.css'
import { RaceBy } from '@uiball/loaders'

const FeaturedToursList = () => {
  const url = `${import.meta.env.VITE_LOCAL_URL}/tours/featured`
  const { data: featuredTours, loading, error } = useFetch(url)

  // Function to shuffle the featured tours array
  const shuffle = array => {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }
    return shuffledArray
  }

  // Shuffle the featured tours and display only 8
  const shuffledTours = shuffle(featuredTours || [])
  const featuredToursToDisplay = shuffledTours.slice(0, 8)

  return (
    <>
      {loading && (
        <>
          <div className='spinner'>
            <RaceBy size={80} lineWeight={5} speed={1.4} color='black' />
          </div>
        </>
      )}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredToursToDisplay?.map(tour => (
          <div className='tour-card-wrapper col-lg-3' key={tour._id}>
            <TourCard tour={tour} />
          </div>
        ))}
    </>
  )
}

export default FeaturedToursList
