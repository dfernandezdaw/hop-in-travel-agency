import React, { useState, useContext } from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/login.png'
import userIcon from '../assets/user.png'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  })

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
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
          <div className='col-lg-8 m-auto'>
            <div className='login-container d-flex justify-content-between'>
              <div className='login-img'>
                <img src={registerImg} alt='' />
              </div>

              <div className='login-form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>
                <h2>Register</h2>

                <form onSubmit={handleClick}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Username'
                      id='username'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='email'
                      placeholder='Email'
                      id='email'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      placeholder='Password'
                      id='password'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    className='btn secondary__btn auth__btn'
                    type='submit'
                  >
                    Create Account
                  </button>
                </form>
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
