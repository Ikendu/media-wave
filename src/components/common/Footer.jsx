import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import andromedia from '../../assets/andromedia.png'
import { scrollToTop } from '../../constants/auth_actions'

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
})

const Footer = () => {
  const history = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { getValues, register, reset } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  })

  const handleSubscription = async () => {
    try {
      if (getValues().email) {
        console.log(getValues()?.email)
        setIsLoading(true)
        await axios.post('newsletter/subscribe/', {
          email: getValues()?.email,
        })

        setIsLoading(false)
        toast.success('You have been subscribed successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        reset()
      }
    } catch (err) {
      setIsLoading(false)
      toast.error('Your email could not be subscribed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  return (
    <div className="bg-[#222121] w-full text-white text-lg px-3 lg:px-14 xl:px-44 pb-[2rem]">
      <div className="w-full flex flex-col md:grid grid-cols-4 gap-10 items-start justify-between py-10">
        <div className="flex flex-wrap">
          <div
            onClick={() => {
              scrollToTop()
              history('/')
            }}
            className="mb-7 -mt-2 items-center cursor-pointer"
          >
            <div className="w-20 h-20">
              <img src={andromedia} />
            </div>
            <p className="text-blue-400 font-semibold text-xs mb-4">
              ANDROMEDIA
            </p>
          </div>
          <p className="font-normal mb-7 text-sm tracking-wider">
            With Andromedia, you can take your customer service to the next
            level. Engage with customers in real-time and provide instant
            support.
          </p>
        </div>

        <div className="z-10">
          <p className="mb-7 font-medium">COMPANY</p>
          <div className="flex flex-col gap-3">
            {/* <p
              onClick={() => {
                scrollToTop()
                history('/about')
              }}
              className="text-sm cursor-pointer hover:text-[#0CADF8]"
            >
              About Us
            </p> */}
            <p
              onClick={() => {
                scrollToTop()
                history('/contact')
              }}
              className="text-sm cursor-pointer hover:text-[#0CADF8]"
            >
              Contact Us
            </p>
            <p
              onClick={() => {
                scrollToTop()
                history('/pricing')
              }}
              className="text-sm cursor-pointer hover:text-[#0CADF8]"
            >
              Pricing
            </p>
          </div>
        </div>

        <div className="z-10">
          <p className="mb-7 font-medium">HELP</p>
          <div className="flex flex-col gap-3">
            <p
              onClick={() => {
                scrollToTop()
                history('/application')
              }}
              className="text-sm cursor-pointer hover:text-[#0CADF8]"
            >
              Application
            </p>
            <p className="text-sm cursor-pointer hover:text-[#0CADF8]">
              Terms & Service
            </p>
            <p
              onClick={() => {
                scrollToTop()
                history('/privacy-policy')
              }}
              className="text-sm cursor-pointer hover:text-[#0CADF8]"
            >
              Privacy Policy
            </p>
          </div>
        </div>

        <div className="z-10">
          <p className="mb-14"></p>
          <input
            type="email"
            placeholder="Enter email"
            {...register('email')}
            className="bg-white border-none outline-none text-sm p-3 text-[#828282] w-full rounded-lg"
          />
          <button
            disabled={isLoading}
            onClick={handleSubscription}
            className="bg-[#15ACF5] text-white py-3 px-3 w-full rounded-lg my-2 font-medium text-sm"
          >
            {isLoading ? (
              <CircularProgress color="inherit" thickness={6} size={15} />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </div>

      <div className="border border-[#828282]"></div>
    </div>
  )
}

export default Footer
