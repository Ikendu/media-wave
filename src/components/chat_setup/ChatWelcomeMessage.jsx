import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getNextMonth } from '../../constants/auth_actions'
import { handleGenericError } from '../../hooks/errorHandler'
import { setSelectedComp } from '../../store/reducers/auth_reducer'
import { setNewSetupCompany } from '../../store/reducers/chat_reducer'
import { setSelectedCompany } from '../../store/reducers/dashboard_reducer'
import MesageIcon from '../utils/icons/MesageIcon'
import CompanyButton from '../utils/reusables/CompanyButton'

const schema = yup.object().shape({
  message: yup.string().required('Message field cannot be empty'),
})

const ChatWelcomeMessage = ({ handleNext }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [messagePreview, setMessagaePreview] = useState()
  const setupData = useSelector((state) => state.chat.setupData)
  const setupImage = useSelector((state) => state.chat.setupImage)
  const cookies = new Cookies()
  const token = cookies.get('access_token')
  // console.log(token)
  // console.log(setupData)

  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    mode: 'onChange',
  })

  const onSubmit = async () => {
    const data = getValues()

    const bodyFormData = new FormData()
    bodyFormData.append('image', setupImage)

    bodyFormData.append('name', setupData?.items?.name)
    bodyFormData.append('industry', setupData?.items?.industry)
    bodyFormData.append('number_of_agents', setupData?.items?.number_of_agents)
    bodyFormData.append(
      'inquiries_monthly',
      setupData?.items?.inquiries_monthly
    )
    bodyFormData.append('init_message', data?.message)
    bodyFormData.append('size_of_firm', setupData?.items?.size_of_firm)

    bodyFormData.get('image')
    bodyFormData.get('name')
    bodyFormData.get('industry')
    bodyFormData.get('number_of_agents')
    bodyFormData.get('inquiries_monthly')
    bodyFormData.get('init_message')
    bodyFormData.get('size_of_firm')

    // console.log('FormData', bodyFormData)
    // const img = bodyFormData.get('image')
    //console.log(`Formdata`, bodyForm)

    // const reqData = {
    //   image: img,
    //   name: name,
    //   industry: industry,
    //   number_of_agents: number_of_agents,
    //   size_of_firm: size_of_firm,
    //   inquiries_monthly: inquiries_monthly,
    //   init_message: init_message,
    // }

    console.log(`ReqData`, bodyFormData)
    console.log(data)
    setIsLoading(true)
    await axios
      .post('companies/create', bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res)
        toast.success(res?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        setIsLoading(false)
        const expiringDate = getNextMonth()
        dispatch(setNewSetupCompany(res?.data))
        dispatch(setSelectedCompany(res?.data?.id))
        dispatch(setSelectedComp(res?.data))

        cookies.set('company', res?.data, {
          path: '/',
          secure: false,
          sameSite: 'Lax',
          expires: expiringDate,
        })

        handleNext(3)
        //  navigate('/dashboard')
      })
      .catch((err) => {
        let errMsg = handleGenericError(err)
        console.log(errMsg)
        setIsLoading(false)
        toast.error(errMsg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        console.log(err)
      })
  }

  useEffect(() => {
    setValue('message', messagePreview)
  }, [messagePreview, setValue])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full lg:w-[75%] xl:w-[65%] px-3 pb-4"
    >
      <div className="md:w-[25rem] my-[2rem]">
        <p className="text-[#3065A3] font-medium text-xl lg:text-2xl">
          Configuring your chatbot now
        </p>
        <p className="text-[#706868] font-medium text-sm mt-3">
          What&apos;s your preferred way to welcome your visitors to your site?
          Should not be more than 50 letters
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-7 mt-[1rem] w-full">
        <div className="w-full">
          <div
            className={
              errors?.message?.message
                ? 'relative flex flex-col bg-transparent border-2 rounded-3xl border-red-600 my-4'
                : 'relative flex flex-col bg-transparent border-2 rounded-3xl border-[#B1BBC6] my-4'
            }
          >
            <textarea
              className="w-full h-[14rem] py-3 px-3 outline-none bg-inherit rounded-sm no-number-arrows text-sm no-scrollbar"
              value={messagePreview}
              onChange={(e) => setMessagaePreview(e.target.value)}
              type={'text'}
              maxLength={50}
            />
          </div>
        </div>
        <div className="w-full md:-mt-6">
          <p
            onClick={() => setMessagaePreview(getValues()?.message)}
            className="text-sm font-semibold text-center p-1 uppercase text-[#2D80E0] min-w-max cursor-pointer"
          >
            Preview
          </p>
          <div
            onClick={() => setMessagaePreview(getValues()?.message)}
            className="w-full h-[14rem] shadow-2xl rounded-3xl flex justify-between "
          >
            <p className="flex-1 p-5 text-sm text-gray-600">{messagePreview}</p>

            <div className="hidden lg:block w-[6rem] h-[6rem] bg-gradient-to-r from-[#064084] to-[#2D80E0] shadow-md rounded-full px-5 py-6 -mr-[3rem] my-auto">
              <MesageIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[50%] lg:w-[35%] mx-auto mt-[2rem]">
        <CompanyButton disabled={isLoading} type="submit">
          {isLoading ? (
            <CircularProgress color="inherit" thickness={8} size={18} />
          ) : (
            'Continue'
          )}
        </CompanyButton>
      </div>
    </form>
  )
}

export default ChatWelcomeMessage
