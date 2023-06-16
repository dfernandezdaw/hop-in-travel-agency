import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import '../styles/login.css'
import userIcon from '../assets/user.png'

const Login = () => {
  const [authentication, setAuthentication] = useState({
    email: '',
    password: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm()

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async () => {
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
          toast.error('User is not verified. Please verify your email.', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } else if (res.status === 401) {
          // Handle case when password is invalid
          toast.error('Email or password is incorrect. Please try again.', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } else if (res.status === 404) {
          // Handle case when user does not exist
          toast.error('User not registered. Please register to continue.', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } else {
          // Handle other error cases
          toast.error('An error occurred. Please try again', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      } else {
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
      <ToastContainer />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 center'>
            <div className='login-container'>
              <div className='login-img'>
                <img src='/logo3.png' alt='' />
              </div>
              <div className='login-form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>
                <h2>Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='form-group'>
                    <input
                      placeholder='Email'
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type='email'
                      name='email'
                      id='email'
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className='error'>{errors.email.message}</span>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      placeholder='Password'
                      type='password'
                      name='password'
                      id='password'
                      onChange={handleChange}
                    />
                  </div>
                  <button className='btn btn-secondary auth-btn' type='submit'>
                    Login
                  </button>
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
