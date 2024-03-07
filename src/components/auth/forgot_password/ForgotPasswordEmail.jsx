import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import img from '../../../assets/images/password/reset_password_img.png'
import { handleGenericError } from '../../../hooks/errorHandler'
import { setCurrentSignupEmail } from '../../../store/reducers/auth_reducer'
import Button from '../../utils/reusables/Button'
import InputComponent from '../../utils/reusables/InputComponent'
import back_icon from '../../utils/svgs/back_arrow.svg'

const schema = yup.object().shape({
  email: yup.string().required('Email field cannot be empty'),
})

const ForgotPasswordEmail = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
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
    // console.log(data)
    dispatch(setCurrentSignupEmail(data?.email))

    try {
      setIsLoading(true)
      const response = await axios.post('auth/password_reset/', data)
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
      const errMsg = handleGenericError(err)
      console.log(errMsg)
      setError(errMsg)
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
      <p className="mt-[3rem] font-bold md:text-lg">Forgot password?</p>
      <p className="text-[#989DA3] text-sm text-center">
        Enter your Email to help us identify you
      </p>
      <div className="w-full mb-[5rem]">
        <InputComponent
          error={errors?.email?.message}
          register={register('email')}
          type={'email'}
          placeholder={'Enter email'}
          label={'Email'}
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
          <CircularProgress color="inherit" thickness={8} size={18} />
        ) : (
          'Next'
        )}
      </Button>
      <p className="text-xs md:text-sm font-medium text-center mt-3 text-[#070707]">
        <span
          onClick={() => navigate('/login')}
          className="text-[#989DA3] cursor-pointer"
        >
          Return to Sign In
        </span>
      </p>
    </form>
  )
}

export default ForgotPasswordEmail
