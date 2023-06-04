import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageBanner from '../shared/PageBanner'
import TourCard from '../shared/TourCard'

const Search = () => {
  const location = useLocation()

  const [data] = useState(location.state)

  return (
    <>
      <PageBanner title='Search Results' />
      <section>
        <div className='container'>
          <div className='row'>
            {data.length === 0 ? (
              <h4 className='text-center'>No tours found</h4>
            ) : (
              data?.map(tour => (
                <div className='col-lg-3 mb-4' key={tour._id}>
                  <TourCard tour={tour} />{' '}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
