import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
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
  const location = useRef('')
  const distance = useRef(0)
  const maxPeople = useRef(0)

  // Function to handle the submit button
  const handleSubmit = e => {
    e.preventDefault()
    console.log(location.current.value)
    console.log(distance.current.value)
    console.log(maxPeople.current.value)

    //Control the inputs
    if (
      location.current.value === '' ||
      distance.current.value === '' ||
      maxPeople.current.value === ''
    ) {
      // Notify the user that the inputs are empty
      toast.error('Please fill in all the fields', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  return (
    <Col lg='12' className='my-col-lg-12'>
      <div className='search-bar'>
        <ToastContainer />
        <Form className='search-bar-form'>
          <FormGroup className='form-group form-slash'>
            <span>
              <FontAwesomeIcon icon={faMapLocationDot} />
            </span>
            <div>
              <h6>Location</h6>
              <input
                type='text'
                placeholder='Where are you going?'
                ref={location}
              />
            </div>
          </FormGroup>
          <FormGroup className='form-group form-slash'>
            <span>
              <FontAwesomeIcon icon={faRoute} />
            </span>
            <div>
              <h6>Distance</h6>
              <input type='number' placeholder='Distance km' ref={distance} />
            </div>
          </FormGroup>
          <FormGroup className='form-group'>
            <span>
              <FontAwesomeIcon icon={faUserGroup} />
            </span>
            <div>
              <h6>Max People</h6>
              <input type='number' placeholder='0' ref={maxPeople} />
            </div>
          </FormGroup>

          <span className='search-icon' type='submit' onClick={handleSubmit}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </Form>
      </div>
    </Col>
  )
}

export default SearchBar