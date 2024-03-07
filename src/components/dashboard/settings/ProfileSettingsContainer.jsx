import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { setUserData } from '../../../store/reducers/auth_reducer'
import PasswordKeyIcon from '../../utils/icons/PasswordKeyIcon'
import ProfileIcon from '../../utils/icons/ProfileIcon'
import Button from '../../utils/reusables/Button'
import ImagePreview from '../../utils/reusables/ImagePreview'
import InputComponent from '../../utils/reusables/InputComponent'
import SelectComponent from '../../utils/reusables/SelectComponent'
// import andromedia from '../../assets/andromedia.png'
import { setCountries } from '../../../store/reducers/chat_reducer'
import defaultImage from '../../utils/images.png'
import PasswordChange from './chat/PasswordChange'

const schema = yup.object().shape({
  name: yup.string().required('Name field cannot be empty'),
  email: yup.string().required('Email field cannot be empty'),
  country: yup.string().required('Select a country'),
  package: yup.string(),
  image: yup.string(),
})

const ProfileSettingsContainer = () => {
  const [loading, setLoading] = useState(false)
  // const [countryData, setCountryData] = useState([])
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState([])

  const cookies = new Cookies()
  const token = cookies.get('access_token')

  // const { data: user } = useSWR('auth/user')

  const { userData } = useSelector((state) => state.auth)
  const { countries } = useSelector((state) => state.chat)
  // console.log(`Countries Data`, countries)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    const closeModalOnClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    if (isModalOpen) {
      addEventListener('mouseup', closeModalOnClickOutside)
    }

    return () => {
      removeEventListener('mouseup', closeModalOnClickOutside)
    }
  }, [isModalOpen])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
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

  // console.log('Image New', selectedImage[0])

  const onSubmit = async () => {
    const newData = getValues()

    const formData = new FormData()
    formData.append('image', selectedImage[0])
    formData.append('name', newData?.name)
    formData.append('email', newData?.email)
    formData.append('country', newData?.country)
    formData.append('package', newData?.package)

    // console.log('New Form Data', formData)

    formData.get('image')
    formData.get('name')
    formData.get('email')
    formData.get('country')
    formData.get('package')

    try {
      setLoading(true)
      const response = await axios.patch('auth/user/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      // console.log(`FORMDATA`, response)

      dispatch(setUserData(response.data))

      setLoading(false)
      toast.success('You account have been updated', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
      reset()
      //window.location.reload()
    } catch (err) {
      setLoading(false)
      console.log(`error`, err)
      if (err?.response?.status === 400) {
        toast.error('Could not update your account', {
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
  let image = userData?.image
  // console.log('USER IMAGE', image)
  if (!image) {
    image = defaultImage
  }

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await axios.get(
          'https://countriesnow.space/api/v0.1/countries'
        )
        // setCountryData(response?.data?.data)
        dispatch(setCountries(response?.data?.data))
      } catch (err) {
        console.log(err)
      }
    }
    getCountries()
  }, [dispatch])

  //console.log('COUNTRIES', countryData)

  useEffect(() => {
    if (userData) {
      setValue('name', userData?.name)
      setValue('email', userData?.email)
      setValue('country', userData?.country)
      setValue('package', userData?.package)
      setValue('image', image)
    }
  }, [userData, setValue, image])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col gap-5">
        <div className="py-2 border-b-2 flex justify-between items-center">
          Profile
        </div>
        <div className="flex flex-col gap-3 py-2 w-full md:w-[85%] lg:w-[80%]">
          <div className="flex items-center gap-2">
            <ProfileIcon />
            <p>Personal details</p>
          </div>

          <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
            <p className="font-light lg:text-lg">Name</p>
            <div
              className="w-full md:-ml-20 lg:-ml-40"
              title="Click here to change your name"
            >
              <InputComponent
                error={errors?.name?.message}
                register={register('name')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
            <p className="font-light lg:text-lg">Profie Picture</p>
            <div title="Click here to change your profile image">
              <ImagePreview
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                image={image}
              />
            </div>

            {/* <ProfileImagePreview /> */}
          </div>
          <div
            className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start"
            title="You cannot change your email"
          >
            <p className="font-light lg:text-lg">Email</p>
            <div className="w-full md:-ml-20 lg:-ml-40">
              <InputComponent
                error={errors?.email?.message}
                register={register('email')}
                disabled
              />
            </div>
          </div>
          <div
            className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start"
            title="Have you relocated? you can change to your location here"
          >
            <p className="font-light lg:text-lg">Country</p>
            <div className="w-full md:-ml-20 lg:-ml-40">
              <SelectComponent
                error={errors?.country?.message}
                register={register('country')}
                elements={countries}
              />
            </div>
          </div>

          <div
            className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start"
            title="Upgrade to change your package"
          >
            <p className="font-light lg:text-lg">Package</p>
            <div className="w-full md:-ml-20 lg:-ml-40">
              <SelectComponent
                error={errors?.package?.message}
                register={register('package')}
                elements={[userData?.package, 'developer', 'expert']}
                disabled
              />
            </div>
          </div>

          <div
            className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start"
            title="Change your password from here"
          >
            <div className="flex gap-2">
              <PasswordKeyIcon />
              <p className="font-light lg:text-lg">Password</p>
            </div>
            <div className="w-full md:-ml-20 lg:-ml-40">
              <div
                className="text-[#225EA3] font-semibold cursor-pointer"
                onClick={openModal}
              >
                Change password
              </div>
            </div>
          </div>

          <div
            className="w-[12rem] mx-auto mt-[1rem]"
            title="Click here to save your current changes"
          >
            <Button type="submit" loading={loading}>
              {loading ? (
                <CircularProgress color="inherit" thickness={10} size={18} />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </form>
      {isModalOpen && <PasswordChange modalRef={modalRef} />}
    </div>
  )
}

export default ProfileSettingsContainer
