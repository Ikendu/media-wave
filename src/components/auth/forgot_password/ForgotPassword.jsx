import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import axios from 'axios'
import { toast } from 'react-toastify'
import img from '../../../assets/images/password/reset_password_img.png'
import Button from '../../utils/reusables/Button'
import InputComponent from '../../utils/reusables/InputComponent'
import back_icon from '../../utils/svgs/back_arrow.svg'

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters.')
    .matches(
      RegExp('(.*[a-z].*)'),
      'Password must contain contan at least one lowercase letter'
    )
    .matches(
      RegExp('(.*[A-Z].*)'),
      'Password must contain contan at least one uppercase letter'
    )
    .matches(
      RegExp('(.*\\d.*)'),
      'Password must contain contan at least one number'
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      'Password must contain contan at least one special character'
    ),
  confirm_password: yup.string().required('Confirm Password is required'),
})

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    console.log(data)

    try {
      setIsLoading(true)
      const response = await axios.post('auth/login/', data)
      console.log(response)

      setIsLoading(false)
      toast.success('Welcome back', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
      reset()
      navigate('/forgot-password-verify')
    } catch (err) {
      setIsLoading(false)
      if (err?.response?.status === 400) {
        setError('Could not send an email')
      } else {
        setError('Network error, try again')
      }
    }
  }

  setTimeout(() => {
    setError(null)
  }, 20000)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex flex-col justify-around items-center gap-3 px-7 md:px-14 py-3 w-[90vw] md:w-[70vw] lg:w-[50vw] rounded-sm shadow-2xl shadow-[#5b1f4817] relative"
    >
      <div className="absolute top-2 md:top-5 left-5 md:left-10">
        <img
          src={back_icon}
          alt=""
          onClick={() => navigate(-1)}
          className="w-[1.2rem] cursor-pointer"
        />
      </div>
      <img src={img} alt="" className="h-[14rem] md:h-[16rem]" />
      <p className="mt-[3rem] font-bold md:text-lg">Set a new password</p>
      <p className="text-[#989DA3] text-sm text-center">
        In order to keep your account safe you need to create a strong password.
      </p>
      <div className="w-full mb-[5rem]">
        <InputComponent
          error={errors?.password?.message}
          register={register('password')}
          type={'password'}
          placeholder={'Enter a new password'}
          label={'Password'}
          password
        />
        <InputComponent
          error={errors?.confirm_password?.message}
          register={register('confirm_password')}
          type={'password'}
          placeholder={'Repeat password'}
          label={'Confirm Password'}
          password
        />

        {error || errors?.email?.message ? (
          <Alert
            severity="error"
            style={{
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {error || errors?.email?.message}
          </Alert>
        ) : null}
      </div>

      <Button type="submit" loading={isLoading}>
        {isLoading ? (
          <CircularProgress color="secondary" thickness={10} size={18} />
        ) : (
          'Change Password'
        )}
      </Button>
    </form>
  )
}

export default ForgotPassword
