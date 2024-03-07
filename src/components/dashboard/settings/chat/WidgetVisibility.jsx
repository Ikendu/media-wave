import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import EyeVisibilityIcon from '../../../utils/icons/EyeVisibilityIcon'
import InputComponent from '../../../utils/reusables/InputComponent'
import TextareaComponent from '../../../utils/reusables/TextareaComponent'

const schema = yup.object().shape({
  name: yup.string().required('Name field cannot be empty'),
  status: yup.string().required('Email field cannot be empty'),
  label: yup.string().required('Select a country'),
  sound: yup.string(),
})

const WidgetVisibility = ({ company }) => {
  const [isChecked, setIsChecked] = useState(false)

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
      setValue('offline_status', company?.offline_status)
      setValue('init_message', company?.init_message)
    }
  })

  return (
    <>
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
          <label className="switch">
            <input
              onClick={() => setIsChecked(!isChecked)}
              type="checkbox"
              checked={isChecked}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Offline status</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <InputComponent
            error={errors?.company?.offline_status}
            register={register('offline_status')}
            placeholder="We typically reply within a few minutes."
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start">
        <p className="text-sm lg:text-base">Offline message</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <TextareaComponent
            error={errors?.company?.offline_status}
            register={register('init_message')}
            placeholder="We typically reply within a few minutes."
          />
        </div>
      </div>
    </>
  )
}

export default WidgetVisibility
