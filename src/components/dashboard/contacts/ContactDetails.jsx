import EmailIcon from '@mui/icons-material/Email'
import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import { setDetails } from '../../../store/reducers/contacts_reducer'
import ContactAvatarIcon from '../../utils/icons/ContactAvatarIcon'
import ContactNoteAdd from '../../utils/icons/ContactNoteAdd'
import ContactNoteLine from '../../utils/icons/ContactNoteLine'
import ContactTagIcon from '../../utils/icons/ContactTagIcon'
import DashboardLocationIcon from '../../utils/icons/DashboardLocationIcon'
import DashboardPhoneIcon from '../../utils/icons/DashboardPhoneIcon'

const ContactDetails = () => {
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id

  const dispatch = useDispatch()
  const selectedContactId = useSelector(
    (state) => state.dashboard.selectedContact
  )

  const { data: selectedContact } = useSWR(
    `companies/${companyId}/customers/${selectedContactId}`
  )

  useEffect(() => {
    dispatch(setDetails(selectedContact))

    return () => {
      dispatch(setDetails([]))
    }
  }, [selectedContact, dispatch])

  if (!selectedContact) {
    return (
      <div className="w-full h-[75vh] bg-white rounded-md flex flex-col gap-16 p-0 lg:p-7">
        <CircularProgress color="secondary" thickness={10} size={18} />
      </div>
    )
  }

  return (
    <div className="w-[300px] h-[75vh] bg-white flex-1 flex-col gap-16 p-0 lg:p-7 border space-y-4">
      <div className="">
        <button className="border-b-2 border-[#2B4C8D] font-medium">
          Info
        </button>
      </div>
      <div className="flex flex-col  h-[90%] p-4 px-8 text-sm justify-center  shadow-xl ">
        <div className="pb-4">
          <div className="flex items-start justify-start gap-3 w-full  py-3 border-b border-gray-100">
            <ContactAvatarIcon />
            <p className="text-[#030229]">{selectedContact?.name}</p>
          </div>
          <div className="flex items-start justify-start gap-3 w-full py-3 border-b border-gray-100">
            <EmailIcon className="text-gray-300" />
            <p className="text-[#030229]">{selectedContact?.email}</p>
          </div>
          <div className="flex items-start justify-start py-3  w-full border-b border-gray-100 gap-3">
            <DashboardPhoneIcon />
            <p className="text-[#030229]">{selectedContact?.phone}</p>
          </div>
          <div className="flex items-start justify-start  py-3 w-full  border-b border-gray-100 gap-3">
            <DashboardLocationIcon />
            <p className="text-[#030229]">{selectedContact?.location}</p>
          </div>
          <div className="flex items-start justify-start  py-3 w-full  border-b border-gray-100 gap-3">
            <ContactNoteLine />
            <p className="text-[#030229]">Add Note</p>
            <ContactNoteAdd />
          </div>
        </div>
        <div className="border p-4 flex space-x-3">
          <ContactTagIcon />
          <span>Add a tag...</span>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
