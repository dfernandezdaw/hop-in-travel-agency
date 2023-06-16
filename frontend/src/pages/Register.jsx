import React, { useState, useContext } from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import userIcon from '../assets/user.png'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm()

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const onSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCAL_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(credentials),
        }
      )
      const result = await res.json()

      if (!res.ok) alert(result.message)

      dispatch({ type: 'REGISTER_SUCCESS' })
      navigate('/login')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <section>
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
                <div className='register-container'>
                  <h2>Register</h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                      <input
                        type='text'
                        {...register('username', {
                          required: 'Username is required',
                        })}
                        placeholder='Username'
                        id='username'
                        onChange={handleChange}
                      />
                      {errors.username && (
                        <p className='text-danger'>{errors.username.message}</p>
                      )}
                    </div>
                    <div className='form-group'>
                      <input
                        type='email'
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            message: 'Invalid email format',
                          },
                        })}
                        placeholder='Email'
                        id='email'
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className='text-danger'>{errors.email.message}</p>
                      )}
                    </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        {...register('password', {
                          minLength: {
                            value: 6,
                            message:
                              'Password must be at least 6 characters long',
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/,
                            message:
                              'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                          },
                        })}
                        placeholder='Password'
                        id='password'
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className='text-danger'>{errors.password.message}</p>
                      )}
                    </div>
                    <button
                      className='btn secondary-btn auth-btn'
                      type='submit'
                    >
                      Create Account
                    </button>
                  </form>
                </div>
                <p>
                  Already have an account? <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
