import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  navigationItemsOptions,
  navigations,
  useNavigation,
} from './SidebarData'

const SidebarOptions = () => {
  const sidebarActivePage = useSelector(
    (state) => state.dashboard.sidebarActivePage
  )
  const activeItem = useSelector((state) => state.dashboard.activeItem)

  const { handleItemClick } = useNavigation()
  const [dropDown, setDropDown] = useState(true)

  return (
    // Investor dashboard sidebar ui
    <div className="hidden md:flex md:w-[20%] md:py-0 xl:w-[20%] 2xl:w-[17%] md:px-0 bg-[#fff] px-3 py-2 lg:px-0 lg:py-0 flex-col h-full justify-between shadow-lg overflow-y-scroll">
      <div className="flex flex-col gap-5">
        <div className="bg-[#225EA3] flex p-3 shadow-lg py-6 px-4 justify-start text-[18px] text-white font-semibold items-center space-x-3">
          {navigations[sidebarActivePage]}
          <span>{sidebarActivePage}</span>
        </div>
        {navigationItemsOptions[sidebarActivePage]?.map((item, index) => (
          <div
            key={index}
            className={`flex relative pl-6 p-2 rounded-xl items-center text-sm xl:text-base cursor-pointer ${
              sidebarActivePage === item.label ? 'rounded-sm' : ''
            }`}
          >
            {!item?.dropDown && (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center w-full p-2 space-x-4 rounded-sm px-4 ${
                  activeItem === item.label ? 'bg-[#C7CED6]' : 'bg-[#FFFFFF]'
                }`}
                onClick={() => handleItemClick(item.label)}
              >
                <div className=""> {item?.icon}</div>
                <div>{item?.label}</div>
              </Link>
            )}
            {item?.dropDown && (
              <button
                onClick={() => {
                  setDropDown(!dropDown)
                }}
                className="flex flex-col w-full"
              >
                <div
                  className={`flex p-2 w-full justify-between rounded-sm px-4 ${
                    activeItem === item.label ? 'bg-[#C7CED6]' : 'bg-[#FFFFFF]'
                  }`}
                  onClick={() => handleItemClick(item.label)}
                >
                  <div className="flex gap-4">
                    {item?.icon}
                    {item?.label}
                  </div>
                  <div className="opacity-60">{item?.dropDown?.icon}</div>
                </div>
                <div
                  className={`${
                    dropDown ? 'hidden' : 'flex'
                  }  gap-2 flex-col space-y-2 justify-center pt-4 border-transparent py-4 shadow-xl rounded-b-lg ml-9`}
                >
                  {item?.dropDown?.items?.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      onClick={() => {}}
                      className={`flex w-full pl-4 text-[#5E656C] gap-4 font-medium text-sm xl:text-base cursor-pointer hover:bg-[#DDEBFA] p-2`}
                    >
                      {item?.label}
                    </Link>
                  ))}
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SidebarOptions
