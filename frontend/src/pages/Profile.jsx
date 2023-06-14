import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../styles/profile.css'

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext)

  const { username, email, profilePicture } = user

  const [selectedFile, setSelectedFile] = useState(null)

  const [profile, setProfile] = useState({
    username: username,
    profilePicture: profilePicture,
    password: '',
    confirmPassword: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm()

  const onSubmit = async () => {
    const { username, email, password, confirmPassword, profilePicture } =
      profile

    if (confirmPassword !== password) {
      toast.error('Passwords do not match')
      return
    }
    const data = new FormData()
    data.append('username', username)

    if (profilePicture) {
      data.append('profilePicture', profilePicture)
    }

    // If the user has entered a new password, append it to the data object
    if (password) {
      data.append('password', password)
    }

    // Make a POST request to the backend to update the user
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/users/update/${user.id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      toast.success('Profile updated successfully')
      dispatch({ type: 'UPDATE_USER', payload: response.data.user })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleBlur = async fieldName => {
    await trigger(fieldName)
  }

  return (
    <section className='profile'>
      <ToastContainer />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2>Profile</h2>
            <div className='img-wrapper'>
              <img
                src={
                  (user && `http://localhost:3000/uploads/${profilePicture}`) ||
                  'http://localhost:3000/uploads/default-avatar.png'
                }
                alt=''
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group'>
                <label htmlFor='profilePicture'>Profile Picture</label>
                <input
                  type='file'
                  {...register('profilePicture', {
                    pattern: {
                      value: /\.(jpe?g|png|gif)$/i,
                      message: 'Invalid image format',
                    },
                  })}
                  name='profilePicture'
                  id='profilePicture'
                  accept='.jpeg, .jpg, .png, .gif'
                  className='form-control'
                  onChange={e => {
                    setSelectedFile(e.target.files[0])
                    setProfile({
                      ...profile,
                      profilePicture: e.target.files[0],
                    })
                  }}
                  onBlur={() => handleBlur('profilePicture')}
                />
                {errors.profilePicture && (
                  <span className='text-danger'>
                    {errors.profilePicture.message}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Username must not exceed 20 characters',
                    },
                  })}
                  name='username'
                  id='username'
                  className='form-control'
                  value={profile.username}
                  onChange={handleChange}
                  onBlur={() => handleBlur('username')}
                />
                {errors.username && (
                  <span className='text-danger'>{errors.username.message}</span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='form-control'
                  value={email}
                  disabled // This is disabled because we don't want the user to change their email
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  {...register('password', {
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                    },
                  })}
                  name='password'
                  id='password'
                  className='form-control'
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                />
                {errors.password?.type === 'minLength' && (
                  <span className='text-danger'>
                    Password must be at least 6 characters long
                  </span>
                )}
                {errors.password?.type === 'pattern' && (
                  <span className='text-danger'>
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number and one special character
                  </span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  {...register('confirmPassword', {
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                    },
                    validate: value =>
                      value === profile.password || 'Passwords do not match',
                  })}
                  name='confirmPassword'
                  id='confirmPassword'
                  className='form-control'
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                />
                {errors.confirmPassword?.type === 'minLength' && (
                  <span className='text-danger'>
                    Password must be at least 6 characters long
                  </span>
                )}
                {errors.confirmPassword?.type === 'pattern' && (
                  <span className='text-danger'>
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number and one special character
                  </span>
                )}

                {errors.confirmPassword?.type === 'validate' && (
                  <span className='text-danger'>Passwords do not match</span>
                )}
              </div>
              <button type='submit' className='btn btn-primary'>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
