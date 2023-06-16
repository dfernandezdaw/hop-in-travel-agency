import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/admin.css'
import { RaceBy } from '@uiball/loaders'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import PageBanner from '../shared/PageBanner'

const Admin = () => {
  const user = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // New tour data
  const [newTour, setNewTour] = useState({
    title: '',
    description: '',
    images: [],
    duration: '',
    price: '',
    city: '',
    country: '',
    maxGroupSize: '',
    featured: false,
  })

  // Check if user is admin. If not, redirect to home page. Backend check
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user.user) return
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URL}/users/${user.user.id}`
        )
        const data = await response.json()
        if (data.data.role !== 'admin') {
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
  }, [])

  useEffect(() => {
    // Fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URL}/bookings`
        )
        const { data, totalPages } = await response.json()
        setBookings(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBookings()
  }, [])

  const handleDeleteUser = async userId => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCAL_URL}/users/${userId}`),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }

      toast.success('User deleted successfully.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteBooking = async bookingId => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCAL_URL}/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      toast.success('Booking deleted successfully.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      setBookings(prevBookings =>
        prevBookings.filter(booking => booking._id !== bookingId)
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = e => {
    setNewTour(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleFileChange = e => {
    setNewTour(prev => ({ ...prev, images: e.target.files }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Check if all the fields are filled
    for (let key in newTour) {
      if (newTour[key] === '') {
        return toast.error('Please fill all the fields.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    }

    const formData = new FormData()

    // Append all the data to the formData object to be sent to the backend as multipart/form-data
    for (let key in newTour) {
      if (key === 'images') {
        for (let i = 0; i < newTour.images.length; i++) {
          formData.append('images', newTour.images[i])
        }
      } else {
        formData.append(key, newTour[key])
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/tours`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      toast.success('Tour created successfully.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Reset the form
      setNewTour({
        title: '',
        description: '',
        images: [],
        duration: '',
        price: '',
        city: '',
        country: '',
        maxGroupSize: '',
        featured: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <PageBanner title='Admin' />
      <div className='container'>
        {loading && (
          <div className='spinner'>
            <RaceBy size={80} lineWeight={5} speed={1.4} color='black' />
          </div>
        )}
        <div className='admin'>
          <ToastContainer />
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
                    <td>${booking.bookingPrice}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.userId?.username}</td>
                    <td>{booking.tourId?.title}</td>
                    <td>
                      <button onClick={() => handleDeleteBooking(booking._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='admin__create-tour'>
          <h2>Create New Tour</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title'
                name='title'
                value={newTour.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea
                id='description'
                name='description'
                value={newTour.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor='images'>Images</label>
              <input
                type='file'
                id='images'
                name='images'
                onChange={handleFileChange}
                multiple
              />
            </div>
            <div>
              <label htmlFor='duration'>Duration</label>
              <input
                type='number'
                id='duration'
                name='duration'
                min={1}
                value={newTour.duration}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                id='price'
                name='price'
                min={1}
                value={newTour.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                id='city'
                name='city'
                value={newTour.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                id='country'
                name='country'
                value={newTour.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='maxGroupSize'>Max Group Size</label>
              <input
                type='number'
                id='maxGroupSize'
                name='maxGroupSize'
                min='1'
                value={newTour.maxGroupSize}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='featured'>Featured</label>
              <input
                type='checkbox'
                id='featured'
                name='featured'
                checked={newTour.featured}
                onChange={() =>
                  setNewTour(prevTour => ({
                    ...prevTour,
                    featured: !prevTour.featured,
                  }))
                }
              />
            </div>
            <button type='submit'>Create Tour</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Admin
