import React from 'react'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Router from '../router/Router'

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  )
}

export default PublicLayout
