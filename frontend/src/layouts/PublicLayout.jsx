import React from 'react'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Router from '../router/Router'
import { CookieWidget } from 'react-cookie-gpdr'

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Router />
      <CookieWidget
        color={'#55eda1'}
        policyLink='/404'
        policyLinkText={'Read the privacy policy'}
        cookieSecurity={true}
      />
      <Footer />
    </>
  )
}

export default PublicLayout
