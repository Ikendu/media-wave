import { CircularProgress, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addContact } from '../../../store/reducers/contacts_reducer'
import {
  setIsModalOpen,
  setShowAddContact,
} from '../../../store/reducers/dashboard_reducer'
import CancelFillIcon from '../../utils/icons/CancelFillIcon'
import Button from '../../utils/reusables/Button'
import InputComponent from '../../utils/reusables/InputComponent'
import SelectComponent from '../../utils/reusables/SelectComponent'

const AddContact = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id
  const dispatch = useDispatch()
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true)
      formData.company = companyId
      console.log(formData)
      const response = await axios.post(
        `companies/${companyId}/customers/add/`,
        formData
      )
      setIsLoading(false)
      toast.success('Successfully added', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
      dispatch(addContact(response.data))
      dispatch(setShowAddContact(false))

      if (isMediumScreen) {
        dispatch(setIsModalOpen(false))
      }
      reset()
    } catch (error) {
      console.log('Error adding contact', error)
      toast.error('Error adding contact. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  const handleCancel = () => {
    dispatch(setShowAddContact(false))
    if (isMediumScreen) {
      dispatch(setIsModalOpen(false))
    }
  }

  return (
    <form
      className="w-full max-h-[100%] bg-white rounded-md flex flex-col gap-16 p-0 lg:p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <p className="flex justify-between items-center">
          <p className="text-[#030229] text-xl font-semibold">Add Contact</p>
          <div className="p-1 rounded-full" onClick={handleCancel}>
            <CancelFillIcon />
          </div>
        </p>
        <div className="w-full py-4">
          <InputComponent
            type={'text'}
            placeholder={'John'}
            name="name"
            register={register('name', { required: 'Name is required' })}
          />
          <InputComponent
            label={'Email'}
            type={'email'}
            placeholder={'Example@gmail.com'}
            name="email"
            register={register('email', { required: 'Email is required' })}
          />
          <InputComponent
            type={'tel'}
            label={'Phone Number'}
            placeholder={'33757005467'}
            name="phone"
            register={register('phone', { required: 'Phone is required' })}
          />
          <InputComponent
            type={'text'}
            label={'Address'}
            placeholder={'45 Aku Road Nsukka, Enugu'}
            name="location"
            register={register('location')}
          />
          <SelectComponent
            label={'Gender'}
            elements={['Male', 'Female']}
            register={register('gender')}
          />
          <Button type="submit" loading={isLoading}>
            {isLoading ? (
              <CircularProgress color="secondary" thickness={10} size={18} />
            ) : (
              'Add Contact'
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default AddContact
