import { useMediaQuery } from '@mui/material'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import { setSelectedVisitor } from '../../../store/reducers/contacts_reducer'
import { setIsModalOpen } from '../../../store/reducers/dashboard_reducer'

const Visitors = () => {
  const dispatch = useDispatch()
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id
  const selectedVisitorId = useSelector(
    (state) => state.contacts.selectedVisitor
  )
  const isModalOpen = useSelector((state) => state.dashboard.isModalOpen)
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')

  const { data: customers } = useSWR(`companies/${companyId}/customers`)
  const visitorsList = customers?.filter((customer) => customer?.is_vistor)

  return (
    <div className="flex-1 overflow-y-scroll no-scrollbar">
      <div className="grid grid-cols-[1fr,1.5fr,1fr] items-center p-3">
        <p className="text-xs lg:text-sm font-semibold">Name</p>
        <p className="text-xs lg:text-sm font-semibold">Email</p>
        <p className="text-xs lg:text-sm font-semibold"></p>
      </div>
      {visitorsList?.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            dispatch(setSelectedVisitor(item?.id))
            if (isMediumScreen) {
              dispatch(setIsModalOpen(!isModalOpen))
            }
          }}
          className={`relative grid grid-cols-[1fr,1.5fr,1fr] items-center py-4 px-3 cursor-pointer rounded-md shadow-sm mt-[0.5rem] ${
            selectedVisitorId === item?.id ? 'bg-[#2D80E0]' : 'bg-white '
          }`}
        >
          <p
            className={`text-xs lg:text-sm font-medium text-[#030229] ${
              selectedVisitorId === item?.id ? 'text-[#fff]' : 'text-[#030229]'
            }`}
          >
            {item?.name}
          </p>
          <p
            className={`text-xs lg:text-sm font-medium text-[#030229] ${
              selectedVisitorId === item?.id ? 'text-[#fff]' : 'text-[#030229]'
            }`}
          >
            {item?.email}
          </p>
          {/* <a
            href="#"
            className={`text-xs lg:text-sm font-medium text-[#225EA3] ${
              selectedVisitorId === item?.id ? 'text-[#fff]' : 'text-[#225EA3]'
            }`}
          >
            Continue chat...
          </a> */}
        </div>
      ))}
    </div>
  )
}

export default Visitors
