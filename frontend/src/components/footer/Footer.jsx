import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faGithub,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import logo from '/logo3.png'
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

const quick__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
]

const quick__links2 = [
  {
    path: '/gallery',
    display: 'Gallery',
  },
  {
    path: '/login',
    display: 'Login',
  },
  {
    path: '/register',
    display: 'Register',
  },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='logo'>
              <img src={logo} alt='' />
              <p>Hop In! is the world's leading travel agency.</p>
              <div className='social__link d-flex align-items-center gap-4'>
                <span>
                  <Link to='#'>
                    <FontAwesomeIcon icon={faYoutube} />
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div className='col-lg-3'>
            <h5 className='footer__link-title'>Discover</h5>

            <ul className='footer__quick-links'>
              {quick__links.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-lg-3'>
            <h5 className='footer__link-title'>Quick Links</h5>

            <ul className='footer__quick-links'>
              {quick__links2.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-lg-3'>
            <h5 className='footer__link-title'>Contact</h5>

            <ul className='footer__quick-links'>
              <li>
                <h6>
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  Address:
                </h6>
                <p>C. Amiel, s/n, Cádiz</p>
              </li>
              <li>
                <h6>
                  <span>
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  Phone:
                </h6>

                <p>956 24 33 17</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
