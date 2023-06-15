import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import PageBanner from '../shared/PageBanner'

const Admin = () => {
  const user = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is admin. If not, redirect to home page. Backend check
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URL}/users/${user.user.id}`
        )
        const data = await response.json()
        if (data.role !== 'admin') {
          navigate('/')
        }
      } catch (error) {
        console.error(error)
      }
    }
    checkAdmin()
  }, [])

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/users`)
        const data = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [currentPage])

  useEffect(() => {
    // Fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_LOCAL_URL
          }/bookings?page=${currentPage}&limit=4`
        )
        const { data, totalPages } = await response.json()
        setBookings(data)
        setTotalPages(totalPages)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBookings()
  }, [currentPage])

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

  const handleDeleteUser = async userId => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/users/${userId}`)
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteBooking = async bookingId => {
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

  return (
    <>
      <PageBanner title='Admin' />
      <div className='container'>
        <div className='admin'>
          <div className='admin__users'>
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*             <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handlePageChange={handlePageChange}
            /> */}
          </div>
          <div className='admin__bookings'>
            <h2>Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>Booking Date</th>
                  <th>Booking Price</th>
                  <th>Guests</th>
                  <th>Phone</th>
                  <th>User</th>
                  <th>Tour</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td>{booking.bookingPrice}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.user.username}</td>
                    <td>{booking.tour.name}</td>
                    <td>
                      <button onClick={() => handleDeleteBooking(booking._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*             <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handlePageChange={handlePageChange}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
