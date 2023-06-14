import React, { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
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

  const handleSubmit = async e => {
    e.preventDefault()

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
      // Update the user in the context
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
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
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='profilePicture'>Profile Picture</label>
                <input
                  type='file'
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
                />
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='form-control'
                  value={profile.username}
                  onChange={handleChange}
                />
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
                  name='password'
                  id='password'
                  className='form-control'
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  className='form-control'
                  onChange={handleChange}
                />
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
