import NotificationBellIconBlue from "../utils/icons/NotificationBellIconBlue"

const NotficationAndProperty = () => {
  return (
    <div className="flex justify-end items-center w-full space-x-10">
      <div className="relative">
        <span className="absolute text-center text-white left-8 w-4 h-4 rounded-full bg-[#2D80E0] font-medium top-0 text-xs">
          4
        </span>
        <NotificationBellIconBlue />
      </div>
      <div className=" shadow-[0px_5px_4px_rgba(128,128,128,0.3)] rounded-xl p-1 bg-white">
        <button className="bg-[#225EA3] rounded-lg text-white px-10 p-2 font-medium">
          Property
        </button>
      </div>
    </div>
  )
}

export default NotficationAndProperty
