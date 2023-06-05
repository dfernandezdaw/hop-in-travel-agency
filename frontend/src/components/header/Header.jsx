import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './header.css'

const navLinks = [
  { title: 'Home', path: '/home' },
  { title: 'About', path: '/about' },
  { title: 'Tours', path: '/tours' },
]

const Header = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
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
                    <h5>{user.email}</h5>
                    <button className='btn secondary__btn' onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className='btn secondary__btn'>
                      <Link to='/login'>Login</Link>
                    </button>
                    <button className='btn primary__btn'>
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
