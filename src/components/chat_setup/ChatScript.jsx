import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { setAllCompanies, setUserData } from '../../store/reducers/auth_reducer'
import {
  resetSetupData,
  setChatScriptOption,
  setNewSetupCompany,
} from '../../store/reducers/chat_reducer'
import CopyIcon from '../utils/icons/CopyIcon'
import FillMessageIcon from '../utils/icons/FillMessageIcon'
import CompanyButton from '../utils/reusables/CompanyButton'
import CompanyInput from '../utils/reusables/CompanyInput'

const items = [
  'JavaScript',
  'Wordpress',
  'Shopify',
  'E-commerce',
  'WooCommerce',
  'Magneto',
  'Python',
]

const schema = yup.object().shape({
  script: yup
    .string()
    .required('Script field is empty. Not to worry, it is not your fault'),
})

const ChatScript = ({ handleNext }) => {
  const dispatch = useDispatch()
  const chatScriptOption = useSelector((state) => state.chat.chatScriptOption)
  // const setupData = useSelector((state) => state.chat.setupData)
  const newSetupCompany = useSelector((state) => state.chat.newSetupCompany)
  console.log(newSetupCompany)
  const navigate = useNavigate()
  const [copyId, setCopyId] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const cookies = new Cookies()
  const token = cookies.get('access_token')
  const { data: companies } = useSWR(`companies/`)
  const { data: user } = useSWR('auth/user')

  const { register, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    mode: 'onChange',
  })

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(getValues()?.script)
      .then(() => {
        return setCopyId(getValues()?.script)
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error)
      })
  }

  const handleSendEmailToClient = async () => {
    //send email to client
    try {
      setIsSendingEmail(true)
      const response = await axios.post(
        `/api/v1/companies/sends-script/${newSetupCompany?.id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log(response)
      setIsSendingEmail(false)
    } catch (error) {
      console.log(error)
      setIsSendingEmail(false)
    }
  }

  setTimeout(() => {
    setCopyId('')
  }, 3000)

  const handleSubmit = async () => {
    dispatch(setNewSetupCompany(null))
    dispatch(resetSetupData({}))
    handleNext(0)
    dispatch(setAllCompanies(companies))
    dispatch(setUserData(user))
    navigate('/dashboard')
    window.location.reload()
  }

  useEffect(() => {
    setValue('script', newSetupCompany?.widget_link)
  })

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5">
      <div className="min-h-[15rem] w-[95%] md:w-[18rem] rounded-2xl border border-[#ECD6D6] shadow-2xl py-5 mb-7 md:mb-0 z-20">
        {items?.map((item, idx) => (
          <div
            key={idx}
            onClick={() => dispatch(setChatScriptOption(item))}
            className={
              chatScriptOption === item
                ? 'py-3 px-5 bg-[#2D80E0] flex items-center gap-2 text-white text-sm font-semibold cursor-pointer'
                : 'py-3 px-5 bg-transparent flex items-center gap-2 text-[#8092A7] text-sm font-semibold cursor-pointer'
            }
          >
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="w-full px-3 pb-4">
        <div className="text-center">
          <p className="text-[#3065A3] font-medium text-xl lg:text-2xl text-center">
            Turn on live chat for your site visitors.
          </p>
          <p className="text-[#706868] font-medium text-xs lg:text-sm text-center">
            Copy and paste the code snippet in the header section of your html
            file
          </p>
        </div>

        <div className="mt-[3rem] w-full">
          <CompanyInput
            register={register('script')}
            disabled={true}
            label={'COPY THIS CODE AND ADD WIDGET TO WEBSITE'}
          />

          <div className="flex items-center justify-between gap-2 md:gap-5 mt-[1rem]">
            <button
              onClick={copyToClipboard}
              className="bg-white rounded-3xl py-3 px-3 w-full md:min-w-[14rem] shadow-lg border border-[#ECD6D6] text-xs md:text-sm font-medium text-[#B4B0B0] flex items-center justify-center gap-2 min-w-max"
            >
              <CopyIcon />
              <span>{copyId ? 'Copied' : 'Copy to clipboard'}</span>
            </button>
            <button
              onClick={handleSendEmailToClient}
              className="bg-white rounded-3xl py-3 px-3 w-full md:min-w-[14rem] shadow-lg border border-[#ECD6D6] text-xs md:text-sm font-medium text-[#B4B0B0]"
            >
              {isSendingEmail ? (
                <CircularProgress color="inherit" thickness={8} size={14} />
              ) : (
                <p className="flex items-center justify-center gap-2 min-w-max">
                  <FillMessageIcon />
                  <span>Send message to Email</span>
                </p>
              )}
            </button>
          </div>
        </div>

        {/* <div className="mt-[2rem]"></div> */}
        <div className="mt-[4rem]">
          <CompanyButton eventHandler={handleSubmit}>Continue</CompanyButton>
        </div>
      </div>
    </div>
  )
}

export default ChatScript
