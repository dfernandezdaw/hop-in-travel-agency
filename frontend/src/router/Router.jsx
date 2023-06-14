import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourData from '../pages/TourData'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import VerifyEmail from '../pages/VerifyEmail'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'

const Router = () => {
  const { user } = useContext(AuthContext)
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourData />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/tours/search' element={<Search />} />
      <Route path='/verify-email/:token' element={<VerifyEmail />} />
      <Route
        path='/profile'
        element={!user ? <Navigate to='/login' /> : <Profile />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
