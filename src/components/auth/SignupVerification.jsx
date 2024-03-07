import { Alert, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OtpInput from 'react18-input-otp'

import andromedia from '../../assets/andromedia.png'

import { useDispatch, useSelector } from 'react-redux'
import preview2 from '../../assets/images/about/login_preview.png'
import preview5 from '../../assets/images/about/preview5.png'
import { handleGenericError } from '../../hooks/errorHandler'
import { setCurrentSignupEmail } from '../../store/reducers/auth_reducer'
import Button from '../utils/reusables/Button'
import back_icon from '../utils/svgs/back_arrow.svg'

const SignupVerification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({ otp: '' })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resendingOtp, setResendingOtp] = useState(false)

  const currentSignupEmail = useSelector(
    (state) => state.auth.currentSignupEmail
  )

  console.log(currentSignupEmail)

  const { handleSubmit } = useForm()

  const handleChange = (otp) => {
    setError('')
    setState({ otp })
  }

  const onSubmit = async () => {
    if (state?.otp !== '') {
      const data = {
        verification_code: state.otp,
      }

      try {
        setIsLoading(true)
        await axios.post('auth/verify-email/', data)

        setIsLoading(false)
        toast.success('You account has been verified', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        setIsLoading(false)
        dispatch(setCurrentSignupEmail(null))
        navigate('/login')
      } catch (error) {
        setIsLoading(false)
        const err = handleGenericError(error)
        setError(err)
        console.log(err)
      }
    } else {
      setError('Input field cannot be empty')
    }
  }

  const resendOtp = async () => {
    setResendingOtp(true)
    try {
      await axios.post('auth/send-verify-email/', {
        email: currentSignupEmail,
      })

      toast.success('We have sent a code to your email', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
      setResendingOtp(false)
    } catch (error) {
      setResendingOtp(false)
      setError('Network error, try again')
      console.log(error)
    }
    // console.log('resending...')
    // setResendingOtp(false)
  }

  return (
    <div className="min-h-[100vh] w-full bg-white flex relative">
      <div
        onClick={() => navigate('/')}
        className="hidden md:flex items-center cursor-pointer fixed top-1 left-3"
      >
        <div className="w-16 h-16">
          <img src={andromedia} />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex flex-col justify-between items-center gap-3 p-2 md:p-14 min-h-[85vh] w-[97vw] md:w-[70vw] lg:w-[50vw] rounded-sm shadow-2xl shadow-[#5b1f4817] relative"
      >
        <div className="absolute top-2 md:top-5 left-5 md:left-10">
          <img src={back_icon} alt="" className="w-[1.2rem] cursor-pointer" />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold text-center">Verify your account</p>
          <p className="text-[#989DA3] text-sm mt-[1rem] text-center">
            {`Please check your inbox for verification code sent to
            ${currentSignupEmail}`}
          </p>
          <div className="flex flex-col mx-3">
            <OtpInput
              value={state.otp}
              onChange={handleChange}
              numInputs={4}
              inputStyle={
                error
                  ? {
                      outline: 'none',
                      border: '1.5px solid red',
                      borderRadius: '0.125rem',
                      height: '100px',
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
                      height: '100px',
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
                  <p
                    className="text-blue-600 cursor-pointer"
                    onClick={resendOtp}
                  >
                    {resendingOtp ? (
                      <CircularProgress color="info" thickness={10} size={18} />
                    ) : (
                      'Resend'
                    )}
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

      <img
        src={preview2}
        alt=""
        className="fixed -top-20 -right-16 -z-10 md:z-0 h-[25rem]"
      />
      <img
        src={preview5}
        alt=""
        className="fixed -bottom-28 -left-16 -z-10 md:z-0 h-[25rem]"
      />
    </div>
  )
}

export default SignupVerification
