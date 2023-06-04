import React, { useRef } from 'react'
import './search-bar.css'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons'

const ToursSearchBar = ({ onSearch }) => {
  // Initialize useRef variables for searchTerm (city, country)
  const searchTerm = useRef('')

  // Function to handle the submit button
  const handleSubmit = e => {
    e.preventDefault()
    console.log(searchTerm.current.value)

    //Control the inputs
    if (searchTerm.current.value === '') {
      // Call the API that returns all the tours
      onSearch()
    } else {
      // Call the onSearch function from the parent component (Tours.jsx)
      onSearch(searchTerm.current.value)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
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
              <h6>Where are you going?</h6>
              <input
                type='text'
                placeholder='Where are you going?'
                ref={searchTerm}
                onKeyDown={handleKeyPress}
              />
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

export default ToursSearchBar
