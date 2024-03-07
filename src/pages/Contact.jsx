import { Alert } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import bg_image from '../assets/images/about/about_bg.png'
import preview2 from '../assets/images/about/preview2.png'
import preview5 from '../assets/images/about/preview5.png'
import Layout from '../components/common/Layout'
import EmailTwo from '../components/utils/icons/EmailTwo'
import LocationIcon from '../components/utils/icons/LocationIcon'
import PhoneIcon from '../components/utils/icons/PhoneIcon'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      subject: e.target[2].value,
      body: e.target[3].value,
    }

    try {
      setLoading(true)
      await axios.post(`contact-us/`, data)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Network Error, try again!')
      console.log(error)

      setTimeout(() => {
        setError(null)
      }, 20000)
    }
  }

  return (
    <Layout>
      <div className="w-full relative">
        <div className="w-full flex flex-col ">
          <div
            style={{
              backgroundImage: `url(${bg_image})`,
              backgroundSize: 'fill',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left',
            }}
            className="w-full px-5 md:px-12 lg:px-32 xl:px-52 flex flex-col lg:flex-row justify-between items-center lg:items-start py-[2rem] gap-5"
          >
            <div className="w-[20rem]">
              <div className="flex flex-col items-center gap-2">
                <LocationIcon />
                <p className="text-[#15ACF5] font-bold text-xl">ADDRESS</p>
              </div>
              <p className="text-base lg:text-lg text-center">
                31 Enugu Road Opp. St. Theresa&apos;s Cathedral Catholic Church,
                Nsukka, Enugu State
              </p>
            </div>

            <div className="w-[20rem]">
              <div className="flex flex-col items-center gap-2">
                <PhoneIcon />
                <p className="text-[#15ACF5] font-bold text-xl">PHONE</p>
              </div>
              <p className="text-base lg:text-lg text-center">
                +234 915 952 1960
                <br />
                +234 812 494 6594
              </p>
            </div>

            <div className="w-[20rem]">
              <div className="flex flex-col items-center gap-2">
                <EmailTwo />
                <p className="text-[#15ACF5] font-bold text-xl">EMAIL</p>
              </div>
              <p className="text-base lg:text-lg text-center">
                email:support@nanocodes.com.ng
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="my-[5rem] flex flex-col items-center gap-7"
          >
            <p className="text-2xl md:text-4xl text-[#030350] text-center">
              Send Us Message
            </p>

            <div className="w-[90%] lg:w-[50rem] flex flex-col text-sm">
              <label className="text-gray-600 md:text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="bg-white rounded-md w-full h-[3.5rem] outline-none px-2 border-2"
              />
            </div>

            <div className="w-[90%] lg:w-[50rem] flex flex-col text-sm">
              <label className="text-gray-600 md:text-lg font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="andromedia@cc.com"
                className="bg-white rounded-md w-full h-[3.5rem] outline-none px-2 border-2"
              />
            </div>

            <div className="w-[90%] lg:w-[50rem] flex flex-col text-sm">
              <label className="text-gray-600 md:text-lg font-medium">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="bg-white rounded-md w-full h-[3.5rem] outline-none px-2 border-2"
              />
            </div>

            <textarea
              required
              type="text"
              placeholder="Enter your message"
              className="p-2 bg-white rounded-md h-[10rem] max-h-[10rem] w-[90%] lg:w-[50rem] border-2"
            />

            {error && (
              <Alert
                severity="error"
                style={{
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {error}
              </Alert>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#15ACF5] text-white font-medium w-[90%] lg:w-[50rem] rounded-md p-3"
            >
              {loading ? <p>loading</p> : 'Send'}
            </button>
          </form>
        </div>

        <img
          src={preview2}
          alt=""
          className="absolute -bottom-12 right-[25%] -z-10"
        />
        <img src={preview5} alt="" className="absolute top-32 right-[15%]" />
      </div>
    </Layout>
  )
}

export default Contact
