import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { useDispatch } from 'react-redux'
import andromedia from '../../assets/andromedia.png'
import preview2 from '../../assets/images/about/login_preview.png'
import preview5 from '../../assets/images/about/preview5.png'
import { handleGenericError } from '../../hooks/errorHandler'
import { setCurrentSignupEmail } from '../../store/reducers/auth_reducer'
import Button from '../utils/reusables/Button'
import InputComponent from '../utils/reusables/InputComponent'
import SelectComponent from '../utils/reusables/SelectComponent'
import back_icon from '../utils/svgs/back_arrow.svg'

const schema = yup.object().shape({
  name: yup.string().required('Name field cannot be empty'),
  email: yup.string().required('Email field cannot be empty'),
  country: yup.string().required('Email field cannot be empty'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters.')
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password must contain at least one lowercase letter'
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password must contain at least one uppercase letter'
    )
    .matches(RegExp('(.*\\d.*)'), 'Password must contain at least one number')
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password must contain at least one special character'
    ),
})

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

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

    const redData = {
      first_name: data?.name,
      email: data?.email,
      password: data?.password,
    }

    try {
      setIsLoading(true)
      const response = await axios.post('auth/register/', redData)
      console.log(response)

      setIsLoading(false)
      toast.success('You have been registered successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })

      dispatch(setCurrentSignupEmail(data?.email))
      reset()
      navigate('/register-verify')
    } catch (err) {
      setIsLoading(false)
      let errMsg = handleGenericError(err)

      toast.error(errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
      // if (err?.response?.status === 401) {
      //   setError('Incorrect username or password')
      // } else {
      //   setError('Network error, try again')
      // }
    }
  }

  setTimeout(() => {
    setError(null)
  }, 20000)

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await axios.get(
          'https://countriesnow.space/api/v0.1/countries'
        )

        setData(response?.data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    getCountries()
  }, [])

  return (
    <div className="min-h-[100vh] w-full bg-white flex relative my-5">
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
        className="m-auto flex flex-col justify-around items-center gap-3 px-7 md:px-14 py-3 w-[95vw] md:w-[70vw] lg:w-[50vw] rounded-sm shadow-2xl shadow-[#5b1f4817] relative"
      >
        <div
          onClick={() => navigate(-1)}
          className="absolute top-2 md:top-3 left-2 md:left-10"
        >
          <img src={back_icon} alt="" className="w-[1.2rem] cursor-pointer" />
        </div>

        <p className="mt-[3rem] font-bold md:text-lg">Sign Up</p>

        <div className="w-full mb-[5rem] z-10">
          <InputComponent
            error={errors?.name?.message}
            register={register('name')}
            type={'text'}
            placeholder={'Enter your full name'}
            label={'Name'}
          />
          <InputComponent
            error={errors?.email?.message}
            register={register('email')}
            type={'email'}
            placeholder={'Email'}
            label={'Email'}
          />
          <SelectComponent
            error={errors?.country?.message}
            register={register('country')}
            elements={data}
            label={'Country'}
          />
          <InputComponent
            error={errors?.password?.message}
            register={register('password')}
            type={'password'}
            placeholder={'Password'}
            label={'Password'}
            password
          />

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
            'Sign up'
          )}
        </Button>
        <p className="text-xs md:text-sm font-semibold text-center mt-3 text-[#070707]">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#2D80E0] cursor-pointer"
          >
            Log in
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

export default Signup
