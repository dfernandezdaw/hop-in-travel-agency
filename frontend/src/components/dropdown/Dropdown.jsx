import React, { useEffect, useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './dropdown.css'

const Dropdown = ({ closeDropdown }) => {
  const dropdownRef = useRef(null)
  const user = useContext(AuthContext)

  useEffect(() => {
    // Close dropdown when user clicks outside of dropdown
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
        {user.user.role === 'admin' && (
          <li>
            <Link to='/admin' onClick={closeDropdown}>
              Admin
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Dropdown
