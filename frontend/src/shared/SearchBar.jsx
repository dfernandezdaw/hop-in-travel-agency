import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './search-bar.css'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapLocationDot,
  faRoute,
  faSearch,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  // Initialize useRef variables for location, distance, and maxPeople
  const locationRef = useRef('')
  const durationRef = useRef(0)
  const maxPeopleRef = useRef(0)
  const navigate = useNavigate()

  // Function to handle the submit button
  const handleSubmit = async e => {
    e.preventDefault()
    const location = locationRef.current.value
    const duration = durationRef.current.value
    const maxPeople = maxPeopleRef.current.value

    //Control the inputs
    if (location === '' || duration === '' || maxPeople === '') {
      // Notify the user that the inputs are empty
      toast.error('Please fill in all the fields', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      const res = await fetch(
        `${
          import.meta.env.VITE_LOCAL_URL
        }/tours/search-main?city=${location}&duration=${duration}&groupSize=${maxPeople}`
      )

      if (!res.ok)
        toast.error('Something went wrong. Please try again later', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

      const result = await res.json()

      navigate(
        `/tours/search?city=${location}&duration=${duration}&groupSize=${maxPeople}`,
        { state: result.data }
      )
    }
  }

  return (
    <div className='col-lg-12'>
      <div className='search-bar'>
        <ToastContainer />
        <form className='search-bar-form'>
          <div className='form-group form-slash'>
            <span>
              <FontAwesomeIcon icon={faMapLocationDot} />
            </span>
            <div>
              <h6>Location</h6>
              <input
                type='text'
                placeholder='Where are you going?'
                ref={locationRef}
              />
            </div>
          </div>
          <div className='form-group form-slash'>
            <span>
              <FontAwesomeIcon icon={faRoute} />
            </span>
            <div>
              <h6>Duration</h6>
              <input
                type='number'
                placeholder='Duration days'
                ref={durationRef}
              />
            </div>
          </div>
          <div className='form-group'>
            <span>
              <FontAwesomeIcon icon={faUserGroup} />
            </span>
            <div>
              <h6>Max People</h6>
              <input type='number' placeholder='0' ref={maxPeopleRef} />
            </div>
          </div>

          <span className='search-icon' type='submit' onClick={handleSubmit}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
