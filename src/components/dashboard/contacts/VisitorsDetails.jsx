import { CircularProgress } from '@mui/material'
import { Cookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import ContactAvatarIcon from '../../utils/icons/ContactAvatarIcon'
import ContactNoteAdd from '../../utils/icons/ContactNoteAdd'
import ContactNoteLine from '../../utils/icons/ContactNoteLine'
import ContactTagIcon from '../../utils/icons/ContactTagIcon'
import DashboardLocationIcon from '../../utils/icons/DashboardLocationIcon'
import DashboardPhoneIcon from '../../utils/icons/DashboardPhoneIcon'
import EmailIcon from '../../utils/icons/EmailIcon'

const VisitorsDetails = () => {
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id

  const selectedVisitorId = useSelector(
    (state) => state.contacts.selectedVisitor
  )

  const { data: selectedVisitor } = useSWR(
    `companies/${companyId}/customers/${selectedVisitorId}`
  )

  if (!selectedVisitor) {
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
            <p className="text-[#030229]">{selectedVisitor?.name}</p>
          </div>
          <div className="flex items-start justify-start gap-3 w-full py-3 border-b border-gray-100">
            <EmailIcon className="text-gray-300" />
            <p className="text-[#030229]">{selectedVisitor?.email}</p>
          </div>
          <div className="flex items-start justify-start py-3  w-full border-b border-gray-100 gap-3">
            <DashboardPhoneIcon />
            <p className="text-[#030229]">{selectedVisitor?.phone}</p>
          </div>
          <div className="flex items-start justify-start  py-3 w-full  border-b border-gray-100 gap-3">
            <DashboardLocationIcon />
            <p className="text-[#030229]">{selectedVisitor?.location}</p>
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

export default VisitorsDetails
