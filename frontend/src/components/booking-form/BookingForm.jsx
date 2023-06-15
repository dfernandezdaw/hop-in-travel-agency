import React, { useContext, useState, useEffect } from 'react'
import './booking-form.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const BookingForm = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [booking, setBooking] = useState({
    tourId: tour._id,
    userId: user && user.id,
    bookingDate: null,
    bookingPrice: price,
    guests: 1,
    phone: null,
  })

  const serviceFee = Math.round(price * 0.1 * 100) / 100

  const handleChange = e => {
    const { id, value } = e.target
    console.log(`Field ${id} has changed to ${value}`)
    setBooking(prevBooking => ({
      ...prevBooking,
      [id]: value,
    }))
  }

  const handleSubmit = async () => {
    console.log(booking)
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(booking),
      })

      if (res.ok) {
        const data = await res.json()
        navigate('/bookings')
      } else {
        throw new Error('Failed to create booking')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Recalculate totalAmount based on the current number of guests
    const newTotalAmount = price * booking.guests + serviceFee
    setBooking(prevBooking => ({
      ...prevBooking,
      bookingPrice: newTotalAmount,
    }))
  }, [booking.guests, price, serviceFee])

  return (
    <PayPalScriptProvider
      options={{
        'client-id': `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
      }}
    >
      <div className='booking'>
        <ToastContainer />
        <div className='booking-card-top'>
          <h3>
            ${price} <span>/per person</span>
          </h3>
          <span className='tour-rating'>
            <FontAwesomeIcon icon={faStar} />
            {avgRating === 0 ? null : avgRating.toFixed(2)} ({reviews?.length})
          </span>
        </div>

        <div className='booking-card-form'>
          <h5>Information</h5>
          <form className='booking-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Full Name'
                id='fullName'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='tel'
                placeholder='Phone'
                id='phone'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='date'
                placeholder=''
                id='bookingDate'
                onChange={handleChange}
                required
              />
              <input
                type='number'
                placeholder='Guests'
                id='guests'
                min='1'
                required
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        <div className='booking-card-bottom'>
          <ul>
            <li>
              <h5 className='booking-price'>
                ${price} x {booking.guests} guest{booking.guests > 1 ? 's' : ''}
              </h5>
              <span> ${price * booking.guests}</span>
            </li>
            <li>
              <h5>Service Fee</h5>
              <span>${serviceFee}</span>
            </li>
            <li className='total'>
              <h5>Total</h5>
              <span>${booking.bookingPrice}</span>
            </li>
          </ul>
          <PayPalButtons
            style={{ layout: 'horizontal', tagline: false }}
            /* Esta línea me ha traido muchos dolores de cabeza. 
            Si no se fuerza el renderizado del botón de PayPal, el precio no se actualiza cuando se cambia el número de huéspedes. 
            Nota por si alguien lee esto: 2 días perdidos por una simple línea de código. */
            forceReRender={[booking.bookingPrice]}
            createOrder={(data, actions) => {
              const newTotalAmount = price * booking.guests + serviceFee

              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: newTotalAmount,
                    },
                  },
                ],
              })
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                console.log(details)
                toast.success('Payment successful', {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                })

                // Create the booking
                handleSubmit()
              })
            }}
            onError={err => {
              console.log(err)
              toast.error('An error occurred. Please try again', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  )
}

export default BookingForm
