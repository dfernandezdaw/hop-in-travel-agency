import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../styles/login.css'
import login from '../assets/login.png'
import userIcon from '../assets/user.png'

const Login = () => {
  const [authentication, setAuthentication] = useState({
    email: '',
    password: '',
  })

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    try {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(authentication),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 403) {
          // Handle case when user is not verified
          alert('User is not verified. Please verify your email.')
        } else if (res.status === 401) {
          // Handle case when password is invalid
          alert('Email or password is incorrect. Please try again.')
        } else if (res.status === 404) {
          // Handle case when user does not exist
          alert('User does not exist.')
        } else {
          // Handle other error cases
          alert('An error occurred. Please try again later.')
        }
      } else {
        console.log(data)
        dispatch({ type: 'LOGIN_SUCCESS', payload: data })
        navigate('/')
      }
    } catch (error) {
      console.error('Error logging in:', error)
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message })
    }
  }

  const handleChange = e => {
    setAuthentication({ ...authentication, [e.target.id]: e.target.value })
  }

  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='login-container'>
              <div className='login-img'>
                <img src={login} alt='' />
              </div>
              <div className='login-form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      onChange={handleChange}
                      required
                    />
                    <button
                      className='btn btn-secondary auth-btn'
                      type='submit'
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p>
                  Don't have an account? <Link to='/register'>Create</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
