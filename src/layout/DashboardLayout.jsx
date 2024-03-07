import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, Outlet } from 'react-router-dom'
import useSWR from 'swr'
import ProgressBarPage from '../components/common/ProgressBarPage'
import Sidebar from '../components/common/Sidebar'
import SidebarOptions from '../components/common/SidebarOptions'
import DropDownIcon from '../components/utils/icons/DropDownIcon'
import { NotifyBellIcon } from '../components/utils/icons/NotifyBellIcon'
import MainVideoPage from '../components/video/MainVideoPage'
import { getNextMonth } from '../constants/auth_actions'
import { setSelectedComp } from '../store/reducers/auth_reducer'
import { setCallConversationIdList } from '../store/reducers/call_reducer'
import { setSelectedCompany } from '../store/reducers/dashboard_reducer'
import DropDown from './DropDown'

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const modalRef = useRef(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  const { allCompanies } = useSelector((state) => state.auth)
  // const [getCompanies, setGetCompanies] = useState(null)
  const { selectedComp: company } = useSelector((state) => state.auth)
  const selectedCompany = useSelector(
    (state) => state.dashboard.selectedCompany
  )
  const { data: companies } = useSWR(`companies/`)

  console.log(`selected company`, companies)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const closeModalOnClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal()
      }
    }
    if (isModalOpen) {
      addEventListener(`mouseup`, closeModalOnClickOutside)
    }
    return () => removeEventListener(`mouseup`, closeModalOnClickOutside)
  }, [isModalOpen])

  //const company = cookie.get(`company`)
  const user = cookies.get(`user`)

  const { data: unreadNotification } = useSWR(
    `notifications/unread_notifications/${company?.id}`
  )

  useEffect(() => {
    const fetchConversationsList = async () => {
      const conversationsList = await axios.get(
        `/conversations/${selectedCompany || companies[0]?.id}/`
      )
      console.log('before', selectedCompany)
      const ids =
        conversationsList && conversationsList?.data?.map((item) => item?.id)
      //console.log('Layout', selectedCompany, ids)
      dispatch(setCallConversationIdList(ids))
    }
    fetchConversationsList()
  }, [companies, dispatch, selectedCompany])

  useEffect(() => {
    const expiringDate = getNextMonth()
    if (company === null || company === undefined) {
      dispatch(setSelectedCompany(allCompanies[0]?.id))
      dispatch(setSelectedComp(allCompanies[0]))

      cookies.set('company', allCompanies[0], {
        path: '/',
        secure: false,
        sameSite: 'Lax',
        expires: expiringDate,
      })
    }
  }, [allCompanies, company, cookies, dispatch])

  if (!user) return <Navigate to={`/login`} />

  if (showLoading) return <ProgressBarPage />

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <SidebarOptions />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* <Navbar /> */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {/* Content area */}
          <div className="">
            <div className=" w-full mx-auto  ">
              {/* Render child routes using Outlet */}
              <div className="flex gap-5 absolute m-4 right-4 items-center top-2 z-10">
                <Link
                  to="/dashboard/notifications"
                  className="relative"
                  title="Click here to view all notifications"
                >
                  <div className="absolute -right-1 -top-2 text-white px-1 py-[0.5px] text-xs bg-[#225EA3] rounded-full">
                    {unreadNotification?.length}
                  </div>
                  <NotifyBellIcon />
                </Link>
                {/* {allCompanies?.length > 0 && ( */}
                <div title="Click here to select a different company's properties">
                  <button
                    className="bg-[#225EA3] flex gap-4 items-center text-white px-8 py-2 rounded-lg border-2 border-white shadow shadow-gray-400"
                    onClick={openModal}
                  >
                    {company && user ? company?.name : allCompanies[0]?.name}
                    <DropDownIcon />
                  </button>
                  {/* <p className=" italic text-[11px] text-center text-gray-400">
                    Click here to select a company
                  </p> */}
                </div>
              </div>

              {isModalOpen && (
                <DropDown
                  modalRef={modalRef}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  setShowLoading={setShowLoading}
                />
              )}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <MainVideoPage />
    </div>
  )
}

export default DashboardLayout
