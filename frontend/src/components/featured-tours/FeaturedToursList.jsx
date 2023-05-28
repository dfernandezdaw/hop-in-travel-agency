import React from 'react'
import TourCard from '../../shared/TourCard'
import useFetch from './../../hooks/useFetch'
import { Col } from 'reactstrap'
import { RaceBy } from '@uiball/loaders'

const FeaturedToursList = () => {
  const url = `${import.meta.env.VITE_LOCAL_URL}/tours/featured`
  const { data: featuredTours, loading, error } = useFetch(url)
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
        featuredTours?.map(tour => (
          <Col lg='3' className='mb-4 my-col-lg-3' key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  )
}

export default FeaturedToursList
