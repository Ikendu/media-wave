import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { setSelectedComp } from '../../../../store/reducers/auth_reducer'
import EyeVisibilityIcon from '../../../utils/icons/EyeVisibilityIcon'
import PaintBrushIcon from '../../../utils/icons/PaintBrushIcon'
import ScreenIcon from '../../../utils/icons/ScreenIcon'
import Button from '../../../utils/reusables/Button'
import InputComponent from '../../../utils/reusables/InputComponent'
import SelectComponent from '../../../utils/reusables/SelectComponent'
import SettiingsImagePreview from '../../../utils/reusables/SettingsImagePreview'
import TextareaComponent from '../../../utils/reusables/TextareaComponent'

const schema = yup.object().shape({
  //online_status: yup.string(),
  // label_text: yup.string(),

  vistor_email: yup.string(),
  vistor_name: yup.string(),
  enable_widget_sound: yup.string(),
  offline_status: yup.string(),
  //image: yup.string(),
  sound: yup.string(),
  init_message: yup.string(),
  website_url: yup.string(),
  label_text: yup.string(),
})

const MainChatSettings = () => {
  const [selectedImage, setSelectedImage] = useState([])
  const [loading, setLoading] = useState(false)
  const { selectedComp: company } = useSelector((state) => state.auth)
  const [isChecked, setIsChecked] = useState(company?.enable_widget_sound)
  const [isCheckedEmail, setIsCheckedEmail] = useState(company?.vistor_email)
  const [isCheckedName, setIsCheckedName] = useState(company?.vistor_name)
  const cookies = new Cookies()
  const token = cookies.get('access_token')

  // const [isChecked1, setIsChecked1] = useState(
  //   company?.display_the_Chat_when_you_offline
  // )
  const dispatch = useDispatch()

  //console.log(`Company Selected`, company)

  const {
    getValues,
    setValue,
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

  // console.log(isChecked, )

  const onSubmit = async () => {
    const data = getValues()
    console.log('All Data', data)
    console.log('Image', selectedImage[0])

    const formData = new FormData()
    formData.append('image', selectedImage[0])
    formData.append('vistor_name', isCheckedEmail)
    formData.append('vistor_email', isCheckedName)
    formData.append('init_message', data?.init_message)
    formData.append('website_url', data?.website_url)
    formData.append('description', data?.description)
    formData.append('offline_status', data?.offline_status)
    formData.append('widget_link', data?.widget_link)
    formData.append('position', data?.position)
    formData.append('enable_widget_sound', isChecked)
    formData.append('label_text', data?.label_text)

    formData.get('image')
    formData.get('vistor_name')
    formData.get('vistor_email')
    formData.get('init_message')
    formData.get('website_url')
    formData.get('description')
    formData.get('offline_status')
    formData.get('widget_link')
    formData.get('position')
    formData.get('enable_widget_sound')
    formData.get('label_text')

    //console.log('Selected Image', selectedImage[0])
    // console.log(`newData`, company?.image)
    try {
      setLoading(true)
      const resp = await axios.patch(
        `companies/${company?.id}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(`submitted`, resp)
      dispatch(setSelectedComp(resp.data))

      setLoading(false)
      toast.success('Your company profile have been updated', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
      reset()
      //window.location.reload()
    } catch (err) {
      console.log(`error`, err)
      setLoading(false)
      if (err?.response?.status === 400) {
        toast.error('Could not update your profile', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
      } else {
        toast.error('An error occured try again', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
      }
    }
  }

  // console.log(getValues())

  useEffect(() => {
    // setValue('label_text', company?.label_text)
    //setValue('offline_status', company?.offline_status)
    setValue('vistor_name', isCheckedEmail)
    setValue('vistor_email', isCheckedName)
    setValue('init_message', company?.init_message)
    setValue('website_url', company?.website_url)
    setValue('description', company?.description)
    setValue('offline_status', company?.offline_status)
    setValue('widget_link', company?.widget_link)
    setValue('position', company?.position)
    setValue('enable_widget_sound', isChecked)
    setValue('label_text', company?.label_text)
    setValue('image', company?.image)
  })

  const image = company?.image
  console.log('COMPANY IMAGE', image)

  return (
    <div>
      {/* <ChatSettingsContainer setAllValues={setValue} newCompany={newCompany} /> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex justify-between items-center py-2 border-b-2">
          <p className="text-[#030229] font-semibold">Chat</p>
        </div>

        {/* <WidgetAppearance setAllValues={setAllValues} company={company} /> */}
        <div className="flex items-center gap-3">
          <PaintBrushIcon />
          <p className="text-[#030229] font-medium text-sm lg:text-base items-center flex gap-3">
            <div className="text-blue-500">{company?.name?.toUpperCase()}</div>{' '}
            Widget appearance
          </p>
        </div>
        {/* <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">Background color</p>
          <div className="flex-1 flex items-center gap-3 md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
            <div className="h-6 w-6 rounded-full cursor-pointer bg-[#2D80E0]"></div>
            <div className="h-6 w-6 rounded-full cursor-pointer bg-[#049D8B]"></div>
            <div className="h-6 w-6 rounded-full cursor-pointer bg-[#970404]"></div>
            <div className="h-6 w-6 rounded-full cursor-pointer bg-[#8F0759]"></div>
            <div className="h-6 w-6 rounded-full cursor-pointer bg-[#9F8E04]"></div>
          </div>
        </div> */}

        {/* <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">Online status</p>
          <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
            <InputComponent
              error={errors?.company?.online_status}
              register={register('online_status')}
              placeholder="Show this message in the chat widget when you're online"
            />
          </div>Save
          </div>
        </div> */}
        <div className="grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">Enable widget sound</p>
          <div
            className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
            title="Click to enable or disable widget sound"
          >
            <label className="switch">
              <input
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">Request visitors email</p>
          <div
            className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
            title="Click to enable of disable visitors email request"
          >
            <label className="switch">
              <input
                checked={isCheckedEmail}
                onClick={() => setIsCheckedEmail(!isCheckedEmail)}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">Request visitors name</p>
          <div
            className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
            title="Click to enable of disable visitors name request"
          >
            <label className="switch">
              <input
                checked={isCheckedName}
                onClick={() => setIsCheckedName(!isCheckedName)}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* <WidgetVisibility setAllValues={setAllValues} company={company} /> */}

        <div className="flex items-center gap-3 mt-[2rem]">
          <EyeVisibilityIcon />
          <p className="text-[#030229] font-medium text-sm lg:text-base">
            Widget visibility
          </p>
        </div>

        <div className="grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">
            Display the Chat
            <br /> When You&apos;re Offline
          </p>
          <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
            <label
              className="switch"
              title="Turn on if you want to display chat when offline"
            >
              <input
                // checked={false}
                // onClick={() => setIsChecked1(`true`)}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
          <p className="text-sm lg:text-base">Offline status</p>
          <div
            className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
            title="Add offline status here"
          >
            <InputComponent
              error={errors?.company?.offline_status}
              register={register('offline_status')}
              placeholder="We typically reply within a few minutes."
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
          <p className="text-sm lg:text-base">Offline message</p>
          <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
            <TextareaComponent
              error={errors?.company?.offline_status}
              register={register('offline_status')}
              placeholder="We typically reply within a few minutes."
            />
          </div>
        </div> */}

        {/* <ChatPageSettings update={update} newCompany={newCompany} /> */}

        <div className="flex flex-col gap-5 mb-10">
          <div className="flex justify-between items-center py-2 border-b-2">
            <p className="text-[#030229] font-semibold">Chat Page</p>
          </div>

          {/* <Appearance company={company} /> */}
          <>
            <div className="flex items-center gap-3">
              <ScreenIcon height="23" width="24" color="#000" />
              <p className="text-[#030229] font-medium text-sm lg:text-base">
                Appearance
              </p>
            </div>
            {/* <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
              <p className="text-sm lg:text-base">Background color</p>
              <div className="flex-1 flex items-center gap-3 md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
                <div className="h-6 w-6 rounded-full cursor-pointer bg-[#9C9B9B]"></div>
                <div className="h-6 w-6 rounded-full cursor-pointer bg-[#039F13]"></div>
                <div className="h-6 w-6 rounded-full cursor-pointer bg-[#051D9B]"></div>
              </div>
            </div> */}
            ...
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
              <p className="text-sm lg:text-base">Company logo</p>
              <div
                className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
                title="Click here to change your company logo"
              >
                <SettiingsImagePreview
                  // error={errors?.company?.offline_status}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  //register={register('image')}
                  image={image}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
              <p className="text-sm lg:text-base">Company URL</p>
              <div
                className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
                title="Click here to change your company's website url"
              >
                <InputComponent
                  register={register('website_url')}
                  placeholder="andromedia.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
              <p className="text-sm lg:text-base">Header</p>
              <div
                className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
                title="Click here to change your company's header message"
              >
                <TextareaComponent
                  register={register('label_text')}
                  placeholder="Welcome to andromedia.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
              <p className="text-sm lg:text-base">Welcome message</p>
              <div
                className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
                title="Click here to change your company's welcome message"
              >
                <TextareaComponent
                  register={register('init_message')}
                  placeholder="Ask us anything"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start lg:items-center">
              <p className="text-sm lg:text-base">Chat page script</p>
              <div
                className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
                title="This is your chat script, you can copy it for your website integration"
              >
                <TextareaComponent
                  disabled={true}
                  register={register('widget_link')}
                  placeholder="https://chatting.page/2tdrv34hts5jiih"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
              <div className="text-sm lg:text-base"></div>
              <p
                onClick={() =>
                  window.open(`https://${company?.website_url}`, '__blank')
                }
                title="Click here to go to open your chat page"
                className="flex items-center justify-center px-5 py-3 bg-white border border-[#8793A1] cursor-pointer rounded-lg md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
              >
                Open chat page
              </p>
            </div>
            <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
              <p className="text-sm lg:text-base">Position</p>
              <div
                className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80"
                title="Click here to change the postion of chat widget on your web page"
              >
                <SelectComponent
                  register={register('position')}
                  elements={['Right']}
                  // disabled={true}
                />
              </div>
            </div>
          </>
        </div>
        <div
          className="z-20 fixed px-14 right-8 bg-[#3e7ede] rounded-lg top-40 shadow shadow-gray-600"
          title="Click here to save your changes"
        >
          <Button
            type="submit"
            loading={loading}
            // disabled={loading}
          >
            {loading ? (
              <CircularProgress thickness={10} size={18} color="inherit" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MainChatSettings
