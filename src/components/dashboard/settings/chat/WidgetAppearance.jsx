import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import PaintBrushIcon from '../../../utils/icons/PaintBrushIcon'
import InputComponent from '../../../utils/reusables/InputComponent'

const schema = yup.object().shape({
  name: yup.string().required('Name field cannot be empty'),
  online_status: yup.string().required('Email field cannot be empty'),
  description: yup.string().required('Select a country'),
  sound: yup.string(),
})

const WidgetAppearance = ({ setAllValues, company }) => {
  const [isChecked, setIsChecked] = useState(false)

  const {
    getValues,
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
      setValue('online_status', company?.online_status)
      setValue('name', company?.name)
      setValue('description', company?.description)
      setValue('enable_widget_soun', company?.enable_widget_sound)
    }
  }, [company, setValue])

  useEffect(() => {
    setAllValues('online_status', getValues()?.online_status)
    setAllValues('name', getValues()?.name)
    setAllValues('description', getValues()?.description)
    setAllValues('enable_widget_soun', getValues()?.enable_widget_sound)
  }, [getValues, setAllValues])

  return (
    <>
      <div className="flex items-center gap-3">
        <PaintBrushIcon />
        <p className="text-[#030229] font-medium text-sm lg:text-base items-center flex gap-3">
          <div className="text-blue-500">{company?.name?.toUpperCase()}</div>{' '}
          Widget appearance
        </p>
      </div>
      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Background color</p>
        <div className="flex-1 flex items-center gap-3 md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#2D80E0]"></div>
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#049D8B]"></div>
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#970404]"></div>
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#8F0759]"></div>
          <div className="h-6 w-6 rounded-full cursor-pointer bg-[#9F8E04]"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Online status</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <InputComponent
            error={errors?.company?.online_status}
            register={register('online_status')}
            placeholder="Show this message in the chat widget when you're online"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-0 md:grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Label text</p>
        <div className="w-full md:-ml-28 lg:-ml-52 xl:-ml-72 2xl:-ml-80">
          <InputComponent
            register={register('description')}
            placeholder="Include a short message next to the closed chat icon."
          />
        </div>
      </div>
      <div className="grid grid-cols-2 place-items-start md:items-center">
        <p className="text-sm lg:text-base">Enable widget sound</p>
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
    </>
  )
}

export default WidgetAppearance
