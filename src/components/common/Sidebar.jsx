import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import andromedia from '../../assets/andromedia.png'
import { setSidebarActivePage } from '../../store/reducers/dashboard_reducer'
import UserLogout from '../dashboard/UserLogout'
import AnalyticsIcon from '../utils/icons/AnalyticsIcon'
import ContactIcon from '../utils/icons/ContactIcon'
import HomeIcon from '../utils/icons/HomeIcon'
import InboxIcon from '../utils/icons/InboxIcon'
import SettingsIcon from '../utils/icons/SettingsIcon'

const Sidebar = () => {
  const dispatch = useDispatch()
  const sidebarActivePage = useSelector(
    (state) => state.dashboard.sidebarActivePage
  )

  const navigationItems = [
    {
      icon: (
        <img
          src={andromedia}
          title="Click here to go back to the Andromedia Home page"
        />
      ),
      label: 'Andromedia',
      to: '/',
    },
    {
      icon: <HomeIcon title={'Click here to visit the dashboard homepage'} />,
      label: 'Dashboard',
      to: '',
    },
    {
      icon: <InboxIcon title={'Click here to view or respond to messages'} />,
      label: 'Inbox',
      to: 'inbox/pending',
    },
    {
      icon: <ContactIcon title={'Click here to go to contact page'} />,
      label: 'Contacts',
      to: 'contacts',
    },
    // {
    //   icon: <EmailIcon />,
    //   label: 'Email',
    //   to: 'email',
    // },
    {
      icon: (
        <AnalyticsIcon
          title={'Click here to view companys graphic analytics'}
        />
      ),
      label: 'Analytics',
      to: 'analytics',
    },
    {
      icon: (
        // <span title="Click here to setup Admin and Company's details">
        <SettingsIcon
          title={"Click here to setup Admin and Company's details"}
        />
        // </span>
      ),
      label: 'Settings',
      to: 'settings',
    },
    {
      icon: (
        <div title="Click here to logout or edit your profile">
          <UserLogout />
        </div>
      ),
      label: 'Logout',
    },
  ]

  const handleItemClick = (label) => {
    dispatch(setSidebarActivePage(label))
    // dispatch(setInvestorTitle(label))
  }
  const handleHideOutlet = () => {
    // dispatch(hideOutlet())
    console.log('hide')
  }

  return (
    // Investor dashboard sidebar ui
    <div className="hidden md:px-2  md:items-center md:flex lg:w-[5%] md:w-[7%] bg-[#225EA3] px-3 lg:px-2 py-5 flex-col h-full">
      <div className="flex flex-col gap-5">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            onClick={() => {
              handleItemClick(item?.label)
              if (item?.label === 'Dashboard') {
                handleHideOutlet()
              }
            }}
            className={`flex md:w-10 md:h-10 md:px-2 rounded-xl justify-center text-white items-center gap-7 xl:text-base cursor-pointer ${
              sidebarActivePage === item?.label ? 'p-3 rounded-sm' : 'p-3'
            }`}
          >
            {item?.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
