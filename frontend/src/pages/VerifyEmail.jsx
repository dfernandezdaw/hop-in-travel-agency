import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/verifyemail.css'

const VerifyEmail = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState(null)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URL}/auth/verify-email/${token}`
        )
        if (response.ok) {
          setVerificationStatus(true)
        } else {
          setVerificationStatus(false)
        }
      } catch (error) {
        setVerificationStatus(false)
      }
    }
    verifyEmail()
  }, [token])

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleRetryClick = () => {
    navigate('/register')
  }

  const renderToastNotification = () => {
    if (verificationStatus === true) {
      toast.success('Email verified successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else if (verificationStatus === false) {
      toast.error('Email verification failed. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  useEffect(() => {
    renderToastNotification()
  }, [verificationStatus])

  return (
    <section className='verification-email'>
      <div className='container-verify'>
        <div className='verification-container'>
          <div
            className={`circle ${
              verificationStatus === true ? 'success' : 'error'
            }`}
          >
            {verificationStatus === true ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faTimes} />
            )}
          </div>
          <p>
            {verificationStatus === true
              ? 'Email verified successfully. Proceed to login.'
              : 'Email verification failed. Please try again.'}
          </p>
          {verificationStatus === true ? (
            <button className='btn-success' onClick={handleLoginClick}>
              Proceed to Login
            </button>
          ) : (
            <button className='btn-error' onClick={handleRetryClick}>
              Retry Verification
            </button>
          )}
        </div>
        <ToastContainer />
      </div>
    </section>
  )
}

export default VerifyEmail
