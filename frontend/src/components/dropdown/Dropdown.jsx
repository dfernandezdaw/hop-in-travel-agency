import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './dropdown.css'

const Dropdown = ({ closeDropdown }) => {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeDropdown])

  return (
    <div className='dropdown-menu' ref={dropdownRef}>
      <ul className='dropdown-items'>
        <li>
          <Link to='/profile' onClick={closeDropdown}>
            Profile
          </Link>
        </li>
        <li>
          <Link to='/bookings' onClick={closeDropdown}>
            Bookings
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
