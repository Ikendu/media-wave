import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { useDispatch } from 'react-redux'
import andromedia from '../../assets/andromedia.png'
import preview2 from '../../assets/images/about/login_preview.png'
import preview5 from '../../assets/images/about/preview5.png'
import { getNextMonth } from '../../constants/auth_actions'
import { handleGenericError } from '../../hooks/errorHandler'
import {
  setAllCompanies,
  setCompanyID,
  setUserData,
} from '../../store/reducers/auth_reducer'
import ProgressBarPage from '../common/ProgressBarPage'
import Button from '../utils/reusables/Button'
import InputComponent from '../utils/reusables/InputComponent'
import back_icon from '../utils/svgs/back_arrow.svg'

const schema = yup.object().shape({
  email: yup.string().required('Email field cannot be empty'),
  password: yup.string().required('Password field cannot be empty'),
})

const Login = () => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const [progress, setProgress] = useState(false)

  const isMobile = window.innerWidth <= 768

  const {
    getValues,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  })

  const onSubmit = async () => {
    const data = getValues()
    const expiringDate = getNextMonth()

    try {
      setIsLoading(true)
      const response = await axios.post('auth/login/', data)
      setUser(response?.data)
      dispatch(setCompanyID(response?.data?.companies[0]?.id))
      dispatch(setAllCompanies(response?.data?.companies))
      dispatch(setUserData(response?.data.user))

      // console.log(`Redux User`, response.data.user)
      // console.log(`companies`, response?.data.companies)
      console.log(`user`, user)

      setIsLoading(false)
      toast.success('Welcome back', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      })
      cookies.set('access_token', response?.data?.token?.access, {
        path: '/',
        secure: false,
        sameSite: 'Lax',
        expires: expiringDate,
      })

      cookies.set('refresh', response?.data?.token?.refresh, {
        path: '/',
        secure: false,
        sameSite: 'Lax',
        expires: expiringDate,
      })

      cookies.set('date', expiringDate, {
        path: '/',
        secure: false,
        sameSite: 'Lax',
        expires: expiringDate,
      })

      cookies.set('user', response?.data?.user, {
        path: '/',
        secure: false,
        sameSite: 'Lax',
        expires: expiringDate,
      })

      reset()

      if (response?.data?.companies.length < 1) {
        return navigate('/company/setup')
      } else if (isMobile) {
        return navigate('/application')
      }

      setProgress(true)

      setTimeout(() => {
        setProgress(false)
        navigate('/dashboard')
        window.location.reload()
      }, 3000)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      const errMsg = handleGenericError(err)
      console.log(errMsg)
      toast.error(errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  setTimeout(() => {
    setError(null)
  }, 20000)

  if (progress) return <ProgressBarPage />

  return (
    <div className="h-[100vh] w-full bg-white flex relative">
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
        className="m-auto flex flex-col justify-around items-center gap-3 px-7 md:px-14 py-3 md:h-[85%] w-[90vw] md:w-[70vw] lg:w-[50vw] rounded-sm shadow-2xl shadow-[#5b1f4817] relative"
      >
        <div
          onClick={() => navigate(-1)}
          className="absolute top-2 md:top-5 left-5 md:left-10"
        >
          <img src={back_icon} alt="" className="w-[1.2rem] cursor-pointer" />
        </div>
        <p className="mt-[3rem] font-bold md:text-lg">Log In</p>
        <div className="w-full mb-[5rem]">
          <InputComponent
            error={errors?.email?.message}
            register={register('email')}
            type={'email'}
            placeholder={'Email'}
            label={'Email'}
          />
          <InputComponent
            error={errors?.password?.message}
            register={register('password')}
            type={'password'}
            placeholder={'Password'}
            label={'Password'}
            password
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="bg-gray-100 border-2 border-gray-300 rounded accent-[#23065B] cursor-pointer"
              />

              <p className="font-medium text-[#070707] text-sm">Remember me</p>
            </div>

            <p
              onClick={() => navigate('/forgot-password')}
              className="text-[#003E85] font-medium text-sm cursor-pointer"
            >
              Forgot Password?
            </p>
          </div>

          {error || errors?.email?.message || errors?.password?.message ? (
            <Alert
              severity="error"
              style={{
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              {error || errors?.email?.message || errors?.password?.message}
            </Alert>
          ) : null}
        </div>

        <Button type="submit" loading={isLoading}>
          {isLoading ? (
            <CircularProgress color="inherit" thickness={6} size={18} />
          ) : (
            'Log in'
          )}
        </Button>
        <p className="text-xs md:text-sm font-medium text-center mt-3 text-[#070707]">
          Don&apos;t have an account yet?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-[#2D80E0] cursor-pointer"
          >
            Sign up
          </span>
        </p>
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
      <img
        src={preview5}
        alt=""
        className="fixed bottom-10 -right-40 -z-10 md:z-0 h-[25rem]"
      />
    </div>
  )
}

export default Login
