import React from 'react'
import PageBanner from '../shared/PageBanner'
import { RaceBy } from '@uiball/loaders'
import useFetch from '../hooks/useFetch'
import TourCard from '../shared/TourCard'

const Tours = () => {
  const url = `${import.meta.env.VITE_LOCAL_URL}/tours?page=1&limit=8`
  const { data: tours, loading, error } = useFetch(url)
  console.log(tours)
  return (
    <>
      <PageBanner title='Tours' />
      <section>
        <div className='container'>
          <div className='row'>
            <div>New Searchbar</div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          {loading && (
            <>
              <div className='spinner'>
                <RaceBy size={80} lineWeight={5} speed={1.4} color='black' />
              </div>
            </>
          )}
          <div className='row'>
            {tours.map(tour => (
              <div className='col-lg-3 col-md-6 col-sm-6 mb-4' key={tour._id}>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Tours
