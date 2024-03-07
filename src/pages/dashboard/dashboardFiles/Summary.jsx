import { useSelector } from 'react-redux'
import useSWR from 'swr'

// const cookie = new Cookies()
// let company = cookie.get(`company`)

const Summary = () => {
  const { selectedCompany: id } = useSelector((state) => state.dashboard)
  console.log(`sumaryID`, id)
  const { data } = useSWR(`dashboard/${id}/`)
  //console.log(data)

  return (
    <div className="all-summary grid grid-cols-2 gap-4  p-10 ">
      <EachSummary
        topic={`Visitors`}
        count={data?.vistors_count}
        percent={60}
        title={'Your website visitors summary of one week'}
      />
      <EachSummary
        topic={`Chats`}
        count={data?.chat_count}
        percent={20}
        title={"Your company's chats summary of one week"}
      />
      <EachSummary
        topic={`Page View`}
        count={data?.pages_count}
        percent={15}
        title={'Your web page views of one week'}
      />
      <EachSummary
        topic={`Reporting`}
        count={10}
        percent={10}
        title={'The total reports of one week'}
      />
    </div>
  )
}

const EachSummary = ({ topic, count, percent, title }) => {
  return (
    <div className="summary w-full rounded-2xl shadow-lg shadow-slate-50 bg-white p-10">
      <h4 className=" font-extrabold text-lg text-slate-700 mb-10">{topic}</h4>
      <div className="grid grid-cols-2 gap-10" title={title}>
        <div className="p-10 bg-slate-200 py-14 rounded-md">
          <p className="text-4xl font-bold text-center ">{count}</p>
          <h2 id="somthing" className="classes"></h2>
        </div>
        <div>
          <p className=" mb-6">Today</p>
          <p className=" text-blue-700">{percent}%</p>
          <p className="font-bold">Last 7 days</p>
        </div>
      </div>
    </div>
  )
}
export default Summary
