import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import NotificationCloseIcon from '../../../utils/icons/NotificationCloseIcon'
import NotificationOpen from '../../../utils/icons/NotificationOpen'
import NotificationSettingIcon from '../../../utils/icons/NotificationSettingIcon'

const NotificationContainer = () => {
  const [activeButton, setActiveButton] = useState('All')
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id
  const [notifications, setNotifications] = useState([])

  const { data: companyNotifications } = useSWR(
    `notifications/company_notifications/${companyId}`
  )
  const { data: unreadCompanyNotifications } = useSWR(
    `notifications/unread_notifications/${companyId}`
  )

  console.log(companyNotifications)

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }

  const getAllNotifications = (buttonName) => {
    handleButtonClick(buttonName)
    setNotifications(companyNotifications)
  }

  const getUnreadNotifications = (buttonName) => {
    handleButtonClick(buttonName)
    setNotifications(unreadCompanyNotifications)
  }

  return (
    <div
      className={`flex mt-32 relative ${
        notifications.length !== 0 ? 'h-fit' : 'h-[400px]'
      } mx-10 flex-col gap-4 overflow-y-auto p-2 md:p-5 lg:p-10 pt-0  border border-gray-400 `}
    >
      <div className="flex  flex-col gap-2">
        <div className="flex justify-end">
          <Link to="/dashboard/notifications/settings">
            <NotificationSettingIcon />
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div className="border-[#DDD6D6] border rounded-md">
            <button
              onClick={() => getAllNotifications('All')}
              className={`p-2 text-[#6E7781AD] ${
                activeButton === 'All' ? 'bg-[#225EA3] text-white' : ''
              } px-4 rounded-l-md`}
            >
              All
            </button>
            <button
              onClick={() => getUnreadNotifications('Unread')}
              className={`p-2 text-[#6E7781AD] ${
                activeButton === 'Unread' ? 'bg-[#225EA3] text-white' : ''
              } px-4 rounded-r-md`}
            >
              Unread
            </button>
          </div>
          {/* <div className="flex-1 mx-4 relative">
            <input
              type="text"
              placeholder="Search..."
              className="border outline-none w-full p-2 rounded-md pl-3"
            />
            <div className="absolute top-1 right-4">
              <SearchIcon className="text-sm" />
            </div>
          </div> */}
          <div className="relative group">
            <button className="border p-2 rounded-md text-[#6E7781] px-4 flex items-center space-x-2">
              <FilterListOutlinedIcon className=" text-sm" />
              <span>Filter notifications</span>
            </button>
            <div className="shadow-lg flex flex-col absolute right-0 px-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer gap-3 py-3 z-10 bg-white">
              <span>Name</span>
              <span>Date</span>
              <span>Type</span>
              <span>Size</span>
            </div>
          </div>
        </div>
      </div>
      {/** Notifications */}
      <div className={`mt-10 ${notifications?.length !== 0 && 'border'} -z-10`}>
        {notifications &&
          notifications?.map((notification) => (
            <>
              <div className="relative p-7">
                <div className="absolute border top-0 left-0 right-0"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {notification?.status == 'read' && (
                      <span>
                        <NotificationOpen />
                      </span>
                    )}

                    {notification?.status == 'unread' && (
                      <span>
                        <NotificationCloseIcon />
                      </span>
                    )}

                    <div className="flex flex-col">
                      <span className="text-xs text-[#415E96]">
                        {notification?.title}
                      </span>
                      <span className="text-sm">{notification?.message}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm">{notification?.created_at}</span>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  )
}

export default NotificationContainer
