import { Alert, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OtpInput from 'react18-input-otp'

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSignupEmail } from '../../../store/reducers/auth_reducer'
import Button from '../../utils/reusables/Button'
import back_icon from '../../utils/svgs/back_arrow.svg'

const ForgotPasswordVerification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({ otp: '' })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resendingOtp, setResendingOtp] = useState(false)
  const currentSignupEmail = useSelector(
    (state) => state.auth.currentSignupEmail
  )

  const { handleSubmit } = useForm()

  const handleChange = (otp) => {
    setError('')
    setState({ otp })
  }

  const onSubmit = async () => {
    if (state?.otp !== '') {
      const data = {
        otp: state.otp,
      }

      try {
        setIsLoading(true)
        await axios.post('auth/verify_email/', data)

        setIsLoading(false)
        toast.success('You account has been verified', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        dispatch(setCurrentSignupEmail(null))
        navigate('/login')
      } catch (error) {
        setIsLoading(false)
        setError('Network error, try again')
        console.log(error)
      }
    } else {
      setError('Input field cannot be empty')
    }
  }

  const resendOtp = async () => {
    setResendingOtp(true)
    console.log('resending...')
    setResendingOtp(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex flex-col justify-between items-center gap-3 p-2 md:p-14 min-h-[85vh] w-[97vw] md:w-[70vw] lg:w-[50vw] rounded-sm shadow-2xl shadow-[#5b1f4817] relative"
    >
      <div className="absolute top-2 md:top-5 left-5 md:left-10">
        <img
          src={back_icon}
          alt=""
          onClick={() => navigate('/forgot-password')}
          className="w-[1.2rem] cursor-pointer"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-bold text-center">Enter Code</p>
        <p className="text-[#989DA3] text-sm mt-[1rem] text-center">
          {` Please check your inbox for verification code sent to
          ${currentSignupEmail}`}
        </p>
        <div className="flex flex-col mx-3">
          <OtpInput
            value={state.otp}
            onChange={handleChange}
            numInputs={6}
            inputStyle={
              error
                ? {
                    outline: 'none',
                    border: '1.5px solid red',
                    borderRadius: '0.125rem',
                    height: '80px',
                    width: '85%',
                    margin: '5px',
                    padding: '0.9rem 1rem',
                    fontSize: '24px',
                    marginTop: '2rem',
                  }
                : {
                    outline: 'none',
                    border: '1.5px solid #000',
                    borderRadius: '0.125rem',
                    height: '80px',
                    width: '85%',
                    margin: '5px',
                    padding: '0.9rem 1rem',
                    fontSize: '24px',
                    marginTop: '2rem',
                  }
            }
          />

          <div className="ml-auto flex gap-1 mr-[5px] text-sm">
            <p>Didn&apos;t get a code?</p>
            <div>
              {resendingOtp ? (
                <CircularProgress color="primary" thickness={10} size={18} />
              ) : (
                <p className="text-blue-600 cursor-pointer" onClick={resendOtp}>
                  Resend
                </p>
              )}
            </div>
          </div>

          {error ? (
            <Alert
              severity="error"
              style={{
                marginTop: '1.5rem',
                marginBottom: '0.5rem',
              }}
            >
              {error}
            </Alert>
          ) : null}
        </div>
      </div>
      <div className="w-full mb-5 mx-0 gap-3">
        {isLoading ? (
          <Button type={'submit'} loading={isLoading}>
            <CircularProgress color="secondary" thickness={10} size={18} />
          </Button>
        ) : (
          <Button type="submit" loading={isLoading}>
            Verify
          </Button>
        )}
        <p className="text-sm text-center mt-5">
          Can’t find it? Please check your spam folder
        </p>
      </div>
    </form>
  )
}

export default ForgotPasswordVerification
