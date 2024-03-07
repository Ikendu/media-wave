import { CircularProgress, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { editContact } from '../../../store/reducers/contacts_reducer'
import {
  setIsEditContact,
  setIsModalOpen,
} from '../../../store/reducers/dashboard_reducer'
import CancelFillIcon from '../../utils/icons/CancelFillIcon'
import InputComponent from '../../utils/reusables/InputComponent'
import SelectComponent from '../../utils/reusables/SelectComponent'

const EditContact = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id
  const selectedContact = useSelector(
    (state) => state.dashboard.selectedContact
  )
  const contact = useSelector((state) =>
    state.contacts.items.find((item) => item.id === selectedContact)
  )

  const [isLoading, setIsLoading] = useState(false)
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        location: contact.location,
        gender: contact.gender,
      })
    }
  }, [contact, reset])
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true)
      await axios.patch(
        `companies/${companyId}/customers/${selectedContact}/`,
        formData
      )
      dispatch(editContact({ id: selectedContact, updatedContact: formData }))
      dispatch(setIsEditContact(false))
      reset()
      setIsLoading(false)
      toast.success('Successfully edited', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    } catch (error) {
      setIsLoading(false)
      console.error('Error updating the contact', error)
      toast.error('Error editing contact. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  const handleCancel = () => {
    dispatch(setIsEditContact(false))
    if (isMediumScreen) {
      dispatch(setIsModalOpen(false))
    }
    reset()
  }

  return (
    <form
      className="w-full h-[100%] bg-white rounded-md flex flex-col gap-16 p-0 lg:p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <p className="flex justify-between items-center">
          <p className="text-[#030229] text-xl font-semibold">Edit Contact</p>
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
            type={'text'}
            label={'Phone Number'}
            placeholder={'33757005467'}
            name="phone"
            register={register('phone')}
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
          <button
            type="submit"
            className="outline-none font-semibold text-sm text-white rounded-xl bg-[#3e7ede] border-2 border-[#3e7ede] p-3 mt-2 shadow-md z-20 w-full"
          >
            {isLoading ? (
              <CircularProgress color="secondary" thickness={5} size={18} />
            ) : (
              'Edit Contact'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditContact
