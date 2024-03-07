import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ScreenIcon from '../../../utils/icons/ScreenIcon'
import InputComponent from '../../../utils/reusables/InputComponent'
import SelectComponent from '../../../utils/reusables/SelectComponent'
import SettiingsImagePreview from '../../../utils/reusables/SettingsImagePreview'
import TextareaComponent from '../../../utils/reusables/TextareaComponent'

const schema = yup.object().shape({
  name: yup.string().required('Name field cannot be empty'),
  status: yup.string().required('Email field cannot be empty'),
  label: yup.string().required('Select a country'),
  sound: yup.string(),
})

const Appearance = ({ company }) => {
  const [selectedImage, setSelectedImage] = useState([])

  const {
    //getValues,
    setValue,
    register,
    // reset,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    reValidateMode: 'onSubmit',
    mode: 'onChange',
  })

  useEffect(() => {
    if (company) {
      setValue('status', company?.offline_status)
      setValue('website_url', company?.website_url)
      setValue('message', company?.init_message)
      setValue('description', company?.description)
      setValue('widget_link', company?.widget_link)
    }
  })
  console.log(company)
  return (
    <>
      <div className="flex items-center gap-3">
        <ScreenIcon height="23" width="24" color="#000" />
        <p className="text-[#030229] font-medium text-sm lg:text-base">
          Appearance
        </p>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Background color</p>
        <div className="flex-1 flex items-center gap-3 md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#9C9B9B]"></div>
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#039F13]"></div>
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#051D9B]"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Company logo</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <SettiingsImagePreview
            error={errors?.company?.offline_status}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Company URL</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <InputComponent
            register={register('website_url')}
            placeholder="andromedia.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
        <p className="text-sm lg:text-base">Header</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <TextareaComponent
            register={register('description')}
            placeholder="Welcome to andromedia.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
        <p className="text-sm lg:text-base">Welcome message</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <TextareaComponent
            register={register('message')}
            placeholder="Ask us anything"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start lg:items-center">
        <p className="text-sm lg:text-base">Chat page URL</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <InputComponent
            register={register('widget_link')}
            placeholder="https://chatting.page/2tdrv34hts5jiih"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
        <div className="text-sm lg:text-base"></div>
        <p className="flex items-center justify-center px-5 py-3 bg-white border border-[#8793A1] cursor-pointer rounded-lg md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          Open chat page
        </p>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Position</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <SelectComponent
            register={register('status')}
            elements={['Left', 'Right']}
            placeholder="We typically reply within a few minutes."
          />
        </div>
      </div>
    </>
  )
}

export default Appearance
