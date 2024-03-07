import NotificationBellIconBlue from "../utils/icons/NotificationBellIconBlue"


const DashboardNotification = () => {
  return (
    <div className="h-fit">
      <div className="flex justify-end items-center w-full">
        <div className="relative">
          <span className="absolute text-center text-white left-8 w-4 h-4 rounded-full bg-[#2D80E0] font-medium top-0 text-xs">
            4
          </span>
          <NotificationBellIconBlue/>
        </div>
        <div className=" shadow-xl rounded-xl p-1 bg-white">
          <button className="bg-[#225EA3] rounded-lg text-white px-12 p-2 font-medium">
            Property
          </button>
        </div>
      </div>
      <div className="shadow-lg w-[100%] h-screen"></div>
    </div>
  )
}

export default DashboardNotification
