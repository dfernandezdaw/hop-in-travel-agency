import React from 'react'
import './page-banner.css'

const PageBanner = ({ title }) => {
  return (
    <section className='banner'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageBanner
