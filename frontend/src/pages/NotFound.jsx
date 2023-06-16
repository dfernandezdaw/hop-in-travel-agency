import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/not-found.css'

const NotFound = () => {
  return (
    <section>
      <div className='not-found-page'>
        <h1 className='not-found-page__title'>404 Page Not Found</h1>
        <p className='not-found-page__message'>
          The requested page does not exist.
        </p>
        <Link to='/' className='not-found-page__button'>
          Go to Homepage
        </Link>
      </div>
    </section>
  )
}

export default NotFound
