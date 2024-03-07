import { useState } from 'react'
import useSWR from 'swr'
import { DownIcon } from '../../../assets/Icons'

const TopLocations = () => {
  //const { selectedCompany: id } = useSelector((state) => state.dashboard)
  //console.log(`location id`, id)
  const [openLocations, setOpenLocation] = useState(false)

  // const { data: analytics } = useSWR(
  //   `conversations/conversation_analytics/${id}/${1000}/`
  // )
  // console.log(`analytics`, analytics)

  const { data: location } = useSWR(`conversations/top-locations/`)
  console.log(`Location`, location)

  return (
    <>
      <div className="flex justify-between mb-8">
        <h3 className=" font-bold">Top locations for Audience</h3>
        <h3
          onClick={() => setOpenLocation(!openLocations)}
          className=" font-bold flex gap-4 cursor-pointer"
        >
          View all <DownIcon />
        </h3>
      </div>
      <div
        className={`grid grid-cols-4 gap-5 text-white ${openLocations ? `overflow-scroll h-[200px]` : `overflow-hidden h-[60px]`}`}
      >
        {location ? (
          location?.map((item, idx) => (
            <div
              className="w-48  h-12 rounded-lg bg-zinc-400 p-1 flex gap-3 "
              key={idx}
            >
              <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
              <div className="py-1 text-xl">{item?.location}</div>
            </div>
          ))
        ) : (
          <>
            <Location />
            <Location />
            <Location />
            <Location />
          </>
        )}
      </div>
    </>
  )
}

export const Location = () => {
  return (
    <div>
      <div className="w-48  h-12 rounded-lg bg-zinc-400 p-1 flex gap-3 ">
        <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
        <div className="py-1 text-xl"></div>
      </div>
    </div>
  )
}
export default TopLocations
