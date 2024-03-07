import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { useState } from 'react'
import useSWR from 'swr'
//import { Data } from './Data'
import { useSelector } from 'react-redux'
import VisitorsChart from './VisitorsChart'

//import Summary from './Summary'

//import './styles.css'

Chart.register(CategoryScale)

const Dashboard = () => {
  const { selectedCompany: id } = useSelector((state) => state.dashboard)
  console.log(`Company selected id`, id)

  const { data: visitors } = useSWR(`vistors/${id}/`)

  // const { data: converse } = useSWR(
  //   `/conversations/analytics/all_conversations/${company?.id}/`
  // )
  //console.log(`converse`, converse)

  //console.log(`visitors`, visitors)

  const visits = visitors?.map((visit) => new Date(visit.created_at))
  //console.log(`All Visits`, visits)
  const days = visits?.map((day) => day.toString().split(` `)[0])
  // console.log(`Day`, days)

  let weekDays = [
    { day: `Mon`, visitors: 0 },
    { day: `Tue`, visitors: 0 },
    { day: `Wed`, visitors: 0 },
    { day: `Thur`, visitors: 0 },
    { day: `Fri`, visitors: 0 },
    { day: `Sat`, visitors: 0 },
    { day: `Sun`, visitors: 0 },
  ]

  for (let i = 0; i < days?.length; i++) {
    if (days[i] == `Mon`) weekDays[0][`visitors`]++
    else if (days[i] == `Tue`) weekDays[1][`visitors`]++
    else if (days[i] == `Wed`) weekDays[2][`visitors`]++
    else if (days[i] == `Thur`) weekDays[3][`visitors`]++
    else if (days[i] == `Fri`) weekDays[4][`visitors`]++
    else if (days[i] == `Sat`) weekDays[5][`visitors`]++
    else if (days[i] == `Sun`) weekDays[6][`visitors`]++
  }
  //console.log(`Week days`, weekDays)

  const [chartData] = useState({
    labels: weekDays.map((data) => data.day),
    datasets: [
      {
        label: 'Users Gained ',
        data: weekDays.map((data) => data.visitors),
        backgroundColor: ['white'],
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  })
  // useEffect(() => {
  //   try {
  //     const response = axios.get(`/vistors/${compId}/`)
  //     console.log(`company`, response.data)
  //   } catch (error) {
  //     console.log(`The error`, error)
  //   }
  // })

  return (
    <>
      <div className="board bg-white m-5 p-12 pt-20  ">
        <p className="font-bold mb-10">Live Visitors</p>
        <VisitorsChart chartData={chartData} />
      </div>
    </>
  )
}
export default Dashboard
