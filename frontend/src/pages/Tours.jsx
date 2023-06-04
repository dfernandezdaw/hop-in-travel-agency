import React, { useState, useEffect } from 'react'
import PageBanner from '../shared/PageBanner'
import { RaceBy } from '@uiball/loaders'
import TourCard from '../shared/TourCard'
import '../styles/tours.css'

const Tours = () => {
  const [tours, setTours] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // Fetch tours on page load and when currentPage changes
  useEffect(() => {
    fetchTours()
  }, [currentPage])

  // Function that fetches tours from the API
  const fetchTours = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_URL}/tours?page=${currentPage}&limit=8`
      )
      const data = await response.json()

      // Update the tours state and totalPages state
      setTours(data.data)
      setTotalPages(data.totalPages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tours:', error)
      setLoading(false)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

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
          {loading ? (
            <div className='spinner'>
              <RaceBy size={80} lineWeight={5} speed={1.4} color='black' />
            </div>
          ) : (
            <div className='row'>
              {tours.map(tour => (
                <div className='col-lg-3 col-md-6 col-sm-6 mb-4' key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          )}
          <div className='pagination'>
            {tours && (
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
            )}
            {/* If there are tours. Based on the totalPages that comes from the API. Generate a button for each page.
             Array.from creates an array from 1 to totalPages.
             Then we map it generating a button with the number of the array. */}
            {tours &&
              Array.from({ length: totalPages }, (_, index) => index + 1).map(
                page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? 'active' : ''}
                  >
                    {page}
                  </button>
                )
              )}
            {tours && (
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Tours
