import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { setSetupData, setSetupImage } from '../../store/reducers/chat_reducer'
import CheckIcon from '../utils/icons/CheckIcon'
import CompanyButton from '../utils/reusables/CompanyButton'
import CompanyInput from '../utils/reusables/CompanyInput'
import CompanySelect from '../utils/reusables/CompanySelect'
import ImagePreview from '../utils/reusables/ImagePreview'

const schema = yup.object().shape({
  name: yup.string().required('Name field cannot be empty'),
  language: yup.string().required('Select a language'),
  color: yup.string().required('Color field cannot be empty'),
})

const ChatSetup = ({ handleNext }) => {
  const dispatch = useDispatch()
  const setupData = useSelector((state) => state.chat.setupData)
  const [color, setColor] = useState('from-purple-200 to-blue-600')
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState([])
  const { setupImage } = useSelector((state) => state.chat)

  const languageList = useMemo(() => {
    return ['English', 'Spanish', 'French']
  }, [])

  const {
    getValues,
    setValue,
    register,
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
    const formData = new FormData()
    formData.append('image', selectedImage[0])
    // dispatch(setSetupImage({ image: formData }))

    dispatch(setSetupData(data))
    dispatch(setSetupImage(selectedImage[0]))
    handleNext(1)
    console.log(`Selected Image`, setupImage)
  }

  const handleColor = (col, selectedCol) => {
    setColor(col)
    setSelectedColor(selectedCol)
  }

  useEffect(() => {
    setValue('color', setupData?.items?.color)
    setValue('name', setupData?.items?.name)
    setValue('language', setupData?.items?.language || languageList[0])
  }, [setValue, setupData, languageList])

  useEffect(() => {
    setValue('color', setupData?.items?.color || color)
  }, [color, setValue, setupData?.items?.color])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-[40%] xl:w-[35%] px-3 pb-4"
    >
      <p className="text-[#3065A3] font-medium text-xl lg:text-2xl text-center">
        Customize your live chat
      </p>

      <div className="mt-[3rem] w-full">
        <CompanyInput
          error={errors?.name?.message}
          register={register('name')}
          label={'Project Name'}
        />
        <CompanySelect
          error={errors?.language?.message}
          register={register('language')}
          elements={languageList}
          label={'choose language'}
        />
      </div>

      <div className="mt-[2rem]">
        <p className="font-semibold text-xs uppercase text-[#2D80E0] min-w-max">
          CHOSE A COLOR SCHEME
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-7 ">
          <div className="flex items-center gap-2 mt-[1rem] z-50">
            <div
              onClick={() =>
                handleColor('bg-gradient-to-b from-blue-500 to-purple-800', 0)
              }
              className="h-[3rem] w-[3rem] rounded-[50%] bg-gradient-to-b from-blue-500 to-purple-800 shadow-md relative cursor-pointer"
            >
              {selectedColor === 0 && <CheckIcon />}
            </div>
            <div
              onClick={() =>
                handleColor('bg-gradient-to-b from-green-600 to-blue-400', 1)
              }
              className="h-[3rem] w-[3rem] rounded-[50%] bg-gradient-to-b from-green-600 to-blue-400 shadow-md relative cursor-pointer"
            >
              {selectedColor === 1 && <CheckIcon />}
            </div>

            <div
              onClick={() =>
                handleColor('bg-gradient-to-b from-purple-200 to-blue-600', 2)
              }
              className="h-[3rem] w-[3rem] rounded-[50%] bg-gradient-to-b from-purple-200 to-blue-600 shadow-md relative cursor-pointer"
            >
              {selectedColor === 2 && <CheckIcon />}
            </div>

            <div
              onClick={() =>
                handleColor('bg-gradient-to-b from-orange-500 to-red-700', 3)
              }
              className="h-[3rem] w-[3rem] rounded-[50%] bg-gradient-to-b from-orange-500 to-red-700 shadow-md relative cursor-pointer"
            >
              {selectedColor === 3 && <CheckIcon />}
            </div>

            <div
              onClick={() => handleColor('bg-[#183E6B]', 4)}
              className="h-[3rem] w-[3rem] rounded-[50%] bg-[#183E6B] shadow-md relative cursor-pointer"
            >
              {selectedColor === 4 && <CheckIcon />}
            </div>
          </div>

          <ImagePreview
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>
      <div className="mt-[4rem]">
        <CompanyButton type="submit">Continue</CompanyButton>
      </div>
    </form>
  )
}

export default ChatSetup
