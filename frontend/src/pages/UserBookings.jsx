import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { RaceBy } from '@uiball/loaders'
import PageBanner from '../shared/PageBanner'
import { AuthContext } from '../context/AuthContext'
import '../styles/user-bookings.css'

const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = useContext(AuthContext)

  useEffect(() => {
    // Fetch user bookings from the backend
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/bookings/user/${
            user.user.id
          }?page=${currentPage}&limit=4`
        )
        const { data, totalPages } = response.data
        setBookings(data)
        setTotalPages(totalPages)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserBookings()
  }, [currentPage, user.user.id])

  const handleCancelBooking = async bookingId => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCAL_URL}/bookings/${bookingId}`
      )
      setBookings(prevBookings =>
        prevBookings.filter(booking => booking._id !== bookingId)
      )
    } catch (error) {
      console.error(error)
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
      <PageBanner title='Bookings' />
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='user-bookings'>
                {loading && (
                  <div className='spinner'>
                    <RaceBy
                      size={80}
                      lineWeight={5}
                      speed={1.4}
                      color='black'
                    />
                  </div>
                )}
                <table className='bookings-table'>
                  <thead>
                    <tr>
                      <th>Tour</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Guests</th>
                      <th>Paid</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking._id}>
                        <td className='tour-cell'>
                          <Link to={`/tours/${booking.tourId._id}`}>
                            <img
                              src={booking.tourId.images[0]}
                              alt={booking.tourId.title}
                              className='tour-image'
                            />
                            {booking.tourId.title}
                          </Link>
                        </td>
                        <td>{new Date(booking.createdAt).toLocaleString()}</td>
                        <td>$ {booking.bookingPrice}</td>
                        <td>{booking.guests}</td>
                        <td>{booking.paid ? 'Yes' : 'No'}</td>
                        <td>
                          <button
                            className='cancel-booking-btn'
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='pagination'>
                  {bookings && (
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  )}
                  {/* If there are tours. Based on the totalPages that comes from the API. Generate a button for each page.
             Array.from creates an array from 1 to totalPages.
             Then we map it generating a button with the number of the array. */}
                  {bookings &&
                    Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? 'active' : ''}
                      >
                        {page}
                      </button>
                    ))}
                  {bookings && (
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserBookings
