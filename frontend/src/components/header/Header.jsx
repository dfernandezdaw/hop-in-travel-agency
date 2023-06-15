import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import './header.css'
import Dropdown from '../dropdown/Dropdown'

const navLinks = [
  { title: 'Home', path: '/home' },
  { title: 'About', path: '/about' },
  { title: 'Tours', path: '/tours' },
]

const Header = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)
  const [showMenu, setShowMenu] = React.useState(false)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const closeDropdown = () => {
    setShowMenu(false)
  }

  return (
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <div className='nav__wrapper'>
            <Link to='/' className='logo'>
              <img src='/logo3.png' alt='Hop In! Logo' />
            </Link>
            <nav className='nav'>
              <ul className='menu'>
                {/* Loop through the navLinks array and generate the list items */}
                {navLinks.map((link, index) => (
                  <li key={index} className='nav__item'>
                    <NavLink
                      to={link.path}
                      className={navClass =>
                        navClass.isActive ? 'active__link' : ''
                      }
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='nav__right'>
              <div className='nav__btns'>
                {user ? (
                  <>
                    <div className='nav-profile-wrapper'>
                      <img
                        src={
                          user.profilePicture
                            ? `http://localhost:3000/uploads/${user.profilePicture}`
                            : 'http://localhost:3000/uploads/default-avatar.png'
                        }
                        alt='Profile Picture'
                        className='nav-profile-picture'
                        onClick={() => setShowMenu(!showMenu)}
                      />
                      {
                        // Show the dropdown menu if showMenu is true
                        showMenu && <Dropdown closeDropdown={closeDropdown} />
                      }
                    </div>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      onClick={logout}
                      className='logout-icon'
                    />
                  </>
                ) : (
                  <>
                    <button className='btn secondary-btn'>
                      <Link to='/login'>Login</Link>
                    </button>
                    <button className='btn primary-btn'>
                      <Link to='/register'>Register</Link>
                    </button>
                  </>
                )}
              </div>
              <span className='mobile__menu'>
                <FontAwesomeIcon icon={faBars} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
