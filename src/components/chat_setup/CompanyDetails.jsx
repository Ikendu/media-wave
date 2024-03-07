import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import { useEffect } from 'react'
import { setSetupData } from '../../store/reducers/chat_reducer'
import CompanyButton from '../utils/reusables/CompanyButton'
import CompanyInput from '../utils/reusables/CompanyInput'
import CompanySelect from '../utils/reusables/CompanySelect'

const schema = yup.object().shape({
  number_of_agents: yup
    .string()
    .required('Number of agents field cannot be empty'),
  size_of_firm: yup.string().required('Size of firm cannot be empty'),
  industry: yup.string().required('Industry field cannot be empty'),
  inquiries_monthly: yup
    .string()
    .required('Monthly enquiries field cannot be empty'),
})

const CompanyDetails = ({ handleNext }) => {
  const dispatch = useDispatch()
  const setupData = useSelector((state) => state.chat.setupData)

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

    dispatch(setSetupData(data))
    handleNext(2)
  }

  useEffect(() => {
    setValue('number_of_agents', setupData?.items?.number_of_agents)
    setValue('size_of_firm', setupData?.items?.size_of_firm)
    setValue('industry', setupData?.items?.industry)
    setValue('inquiries_monthly', setupData?.items?.inquiries_monthly)
  }, [setValue, setupData])
  console.log(setupData)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-full lg:w-[75%] xl:w-[65%] px-3 pb-4"
    >
      <p className="text-[#3065A3] font-medium text-xl lg:text-2xl text-center">
        Provide additional details
      </p>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-[1rem] w-full">
        <div className="w-full">
          <CompanyInput
            error={errors?.number_of_agents?.message}
            register={register('number_of_agents')}
            label={'NUMBER OF AGENT'}
            placeholder={`Enter the number of agents in figures`}
          />
        </div>
        <div className="w-full">
          <CompanyInput
            error={errors?.size_of_firm?.message}
            register={register('size_of_firm')}
            label={'SIZE OF FIRM'}
            placeholder={`Enter the size of firm in figures`}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-[1rem] w-full">
        <div className="w-full">
          <CompanyInput
            error={errors?.industry?.message}
            register={register('industry')}
            label={'INDUSTRY'}
            placeholder={`Type of industry... Eg Technology `}
          />
        </div>
        <div className="w-full">
          <CompanySelect
            error={errors?.inquiries_monthly?.message}
            register={register('inquiries_monthly')}
            elements={[5, 10, 25]}
            label={'HOW MANY INQUIRIES DO YOU GET MONTHLY?'}
          />
        </div>
      </div>

      <div className="w-full md:w-[50%] lg:w-[35%] mt-[2rem]">
        <CompanyButton type={'submit'}>Continue</CompanyButton>
      </div>
    </form>
  )
}

export default CompanyDetails
