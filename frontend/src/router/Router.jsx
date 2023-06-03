import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourData from '../pages/TourData'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import NotFound from '../pages/NotFound'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourData />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/search' element={<Search />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
