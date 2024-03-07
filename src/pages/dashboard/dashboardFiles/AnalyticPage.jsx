import { differenceInCalendarDays, parseISO } from 'date-fns'
import { useState } from 'react'
import useSWR from 'swr'
import { DownIcon } from '../../../assets/Icons'
import BarChart from './BarChart'
import ConversationAnalysis from './ConversationAnalysis'
//import { DataBar } from './DataBar'

import { ClickAwayListener } from '@mui/material'
import { useSelector } from 'react-redux'
import FinalChart from './FinalChart'
import FinalChartMonth from './FinalChartMonth'
import FinalChartWeek from './FinalChartWeek'
import TopLocations from './Location'

// const cookie = new Cookies()
// let user = cookie.get(`user`)

const AnalyticPage = () => {
  const { selectedCompany: id } = useSelector((state) => state.dashboard)
  const [yearSelector, setYearSelector] = useState(false)
  const [monthSelector, setMonthSelector] = useState(false)
  const [daySelector, setDaySelector] = useState(false)
  //console.log(`selected company...`, id)

  const { data: analytics } = useSWR(`conversations/dashboard_analytics/${id}/`)
  console.log(`dashConverse`, analytics)

  //const { data: duration } = useSWR(`conversations/duration/${id}/`)
  //console.log(`duration`, duration)

  let bigData = 0
  let bgColor = []

  const [openDate, setOpenDate] = useState(false)
  const [startDate, setStartDate] = useState(``)
  const [endDate, setEndDate] = useState(``)
  //console.log(`Start Date`, startDate, `End Date`, endDate)

  //For adding class to date selector
  const [value, setValue] = useState(0)
  const handleValue = (num) => {
    setValue(num)
    if (num == 0) {
      setMonthSelector(false)
      setDaySelector(false)
      setYearSelector(true)
    }
    if (num == 1) {
      setMonthSelector(true)
      setDaySelector(false)
      setYearSelector(false)
    }
    if (num == 2) {
      setMonthSelector(false)
      setDaySelector(true)
      setYearSelector(false)
    }
  }
  let selector = [`year`, `month`, `week`]
  function addClasses(type = null) {
    let style = `text-gray-600 font-semibold p-1 px-3 cursor-pointer`
    if (type === selector[value]) {
      style += ` bg-blue-600 text-white rounded-lg`
    }
    return style
  }

  let numberOfDays = 0
  if (openDate && endDate) {
    numberOfDays = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    )
  }
  // const { data: analytic } = useSWR(
  //   `conversations/dashboard_analytics/${id}?start_date=${startDate}&end_date=${endDate}`
  // )
  // console.log(`Query Selector`, analytic)
  //https://example.com/articles?sort=ASC&page=2
  //http//www.techopedia.com/search.aspx?q=database&ion-all

  let startDuration = String(parseISO(startDate))
    .split(` `)
    .slice(0, 4)
    .join(` `)
  //console.log(startDuration)
  let endDuration = String(parseISO(endDate)).split(` `).slice(0, 4).join(` `)
  //console.log(endDuration)
  const handleNoOfDays = (numberOfDays) => {
    if (numberOfDays <= 7) {
      setValue(2)
      setMonthSelector(false)
      setDaySelector(true)
      setYearSelector(false)
    }
    if (numberOfDays >= 8 && numberOfDays <= 30) {
      setValue(1)
      setMonthSelector(true)
      setDaySelector(false)
      setYearSelector(false)
    }
    if (numberOfDays >= 31) {
      setValue(0)
      setMonthSelector(false)
      setDaySelector(false)
      setYearSelector(true)
    }
  }

  // const { data: analytics1 } = useSWR(
  //   `conversations/conversation_analytics/${company.id}/${numberOfDays}/`
  // )
  //console.log(`graph11`, analytics1)

  // let graphData = analytics1?.data.map((item) => item?.created_at.split(`-`)[1])
  // console.log(`Data`, graphData)

  let graphData = analytics?.conversations.map(
    (item) => item?.created_at.split(`-`)[1]
  )
  //console.log(`Data`, graphData)
  let months = [
    { month: `Jan`, visitors: 0 },
    { month: `Feb`, visitors: 0 },
    { month: `Mar`, visitors: 0 },
    { month: `Apr`, visitors: 0 },
    { month: `May`, visitors: 0 },
    { month: `Jun`, visitors: 0 },
    { month: `July`, visitors: 0 },
    { month: `Aug`, visitors: 0 },
    { month: `Sept`, visitors: 0 },
    { month: `Oct`, visitors: 0 },
    { month: `Nov`, visitors: 0 },
    { month: `Dec`, visitors: 0 },
  ]
  for (let i = 0; i < graphData?.length; i++) {
    if (graphData[i] == `01`) months[1][`visitors`]++
    else if (graphData[i] == `02`) months[2][`visitors`]++
    else if (graphData[i] == `03`) months[3][`visitors`]++
    else if (graphData[i] == `04`) months[4][`visitors`]++
    else if (graphData[i] == `05`) months[5][`visitors`]++
    else if (graphData[i] == `06`) months[6][`visitors`]++
    else if (graphData[i] == `07`) months[7][`visitors`]++
    else if (graphData[i] == `08`) months[8][`visitors`]++
    else if (graphData[i] == `09`) months[9][`visitors`]++
    else if (graphData[i] == `10`) months[10][`visitors`]++
    else if (graphData[i] == `11`) months[11][`visitors`]++
    else if (graphData[i] == `12`) months[12][`visitors`]++
  }

  const [chartData] = useState({
    labels: months.map((data) => data.month),
    datasets: [
      {
        label: 'conversations ',
        data: months.map((data) => data.visitors),
        fill: true,
        backgroundColor: (context) => {
          const bgColor = [`blue`, `blue`, `transparent`]
          if (!context.chart.chartArea) return
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart
          const bgGradient = ctx.createLinearGradient(0, top, 0, bottom)
          bgGradient.addColorStop(0, bgColor[0])
          bgGradient.addColorStop(0.7, bgColor[2])
          return bgGradient
        },
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  })

  // For Month Chart
  let days = analytics?.conversations?.map((item) =>
    Number(item?.created_at.split(`-`)[2].split(`T`)[0])
  )
  //console.log(`days`, days)
  let monthDays = [
    { day: 1, visitors: 0 },
    { day: 2, visitors: 0 },
    { day: 3, visitors: 0 },
    { day: 4, visitors: 0 },
    { day: 5, visitors: 0 },
    { day: 6, visitors: 0 },
    { day: 7, visitors: 0 },
    { day: 8, visitors: 0 },
    { day: 9, visitors: 0 },
    { day: 10, visitors: 0 },
    { day: 11, visitors: 0 },
    { day: 12, visitors: 0 },
    { day: 13, visitors: 0 },
    { day: 14, visitors: 0 },
    { day: 15, visitors: 0 },
    { day: 16, visitors: 0 },
    { day: 17, visitors: 0 },
    { day: 18, visitors: 0 },
    { day: 19, visitors: 0 },
    { day: 20, visitors: 0 },
    { day: 21, visitors: 0 },
    { day: 22, visitors: 0 },
    { day: 23, visitors: 0 },
    { day: 24, visitors: 0 },
    { day: 25, visitors: 0 },
    { day: 26, visitors: 0 },
    { day: 27, visitors: 0 },
    { day: 28, visitors: 0 },
    { day: 29, visitors: 0 },
    { day: 30, visitors: 0 },
  ]
  for (let i = 0; i < days?.length; i++) {
    if (days[i] == 1) monthDays[0].visitors++
    else if (days[i] == 2) monthDays[1].visitors++
    else if (days[i] == 3) monthDays[2].visitors++
    else if (days[i] == 4) monthDays[3].visitors++
    else if (days[i] == 5) monthDays[4].visitors++
    else if (days[i] == 6) monthDays[5].visitors++
    else if (days[i] == 7) monthDays[6].visitors++
    else if (days[i] == 8) monthDays[7].visitors++
    else if (days[i] == 9) monthDays[8].visitors++
    else if (days[i] == 10) monthDays[9].visitors++
    else if (days[i] == 11) monthDays[10].visitors++
    else if (days[i] == 12) monthDays[11].visitors++
    else if (days[i] == 13) monthDays[12].visitors++
    else if (days[i] == 14) monthDays[13].visitors++
    else if (days[i] == 15) monthDays[14].visitors++
    else if (days[i] == 16) monthDays[15].visitors++
    else if (days[i] == 17) monthDays[16].visitors++
    else if (days[i] == 18) monthDays[17].visitors++
    else if (days[i] == 19) monthDays[18].visitors++
    else if (days[i] == 20) monthDays[19].visitors++
    else if (days[i] == 21) monthDays[20].visitors++
    else if (days[i] == 22) monthDays[21].visitors++
    else if (days[i] == 23) monthDays[22].visitors++
    else if (days[i] == 24) monthDays[23].visitors++
    else if (days[i] == 25) monthDays[24].visitors++
    else if (days[i] == 26) monthDays[25].visitors++
    else if (days[i] == 27) monthDays[26].visitors++
    else if (days[i] == 28) monthDays[27].visitors++
    else if (days[i] == 29) monthDays[28].visitors++
    else if (days[i] == 30) monthDays[29].visitors++
  }

  const [chartDataMonth] = useState({
    labels: monthDays?.map((data) => data?.day),
    datasets: [
      {
        label: 'conversations ',
        data: monthDays?.map((data) => data?.visitors),
        fill: true,
        backgroundColor: (context) => {
          const bgColor = [`blue`, `blue`, `transparent`]
          if (!context.chart.chartArea) return
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart
          const bgGradient = ctx.createLinearGradient(0, top, 0, bottom)
          bgGradient.addColorStop(0, bgColor[0])
          bgGradient.addColorStop(0.7, bgColor[2])
          return bgGradient
        },
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  })

  //For Days Graph
  const { data: visitors } = useSWR(`vistors/${id}/`)
  //console.log(`Week visitors`, visitors)

  let daysWeek = visitors?.map(
    (item) => new Date(item?.created_at).toString().split(` `)[0]
  )
  //console.log(`Days for week`, daysWeek)

  let weekDays = [
    { day: `Mon`, visitors: 0 },
    { day: `Tue`, visitors: 0 },
    { day: `Wed`, visitors: 0 },
    { day: `Thur`, visitors: 0 },
    { day: `Fri`, visitors: 0 },
    { day: `Sat`, visitors: 0 },
    { day: `Sun`, visitors: 0 },
  ]

  for (let i = 0; i < daysWeek?.length; i++) {
    if (daysWeek[i] == `Mon`) weekDays[0][`visitors`]++
    else if (daysWeek[i] == `Tue`) weekDays[1][`visitors`]++
    else if (daysWeek[i] == `Wed`) weekDays[2][`visitors`]++
    else if (daysWeek[i] == `Thur`) weekDays[3][`visitors`]++
    else if (daysWeek[i] == `Fri`) weekDays[4][`visitors`]++
    else if (daysWeek[i] == `Sat`) weekDays[5][`visitors`]++
    else if (daysWeek[i] == `Sun`) weekDays[6][`visitors`]++
  }

  //console.log(weekDays)company

  const [chartDataWeek] = useState({
    labels: weekDays?.map((data) => data.day),
    datasets: [
      {
        label: 'conversations ',
        data: weekDays?.map((data) => data.visitors),
        fill: true,
        backgroundColor: (context) => {
          const bgColor = [`blue`, `blue`, `transparent`]
          if (!context.chart.chartArea) return
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart
          const bgGradient = ctx.createLinearGradient(0, top, 0, bottom)
          bgGradient.addColorStop(0, bgColor[0])
          bgGradient.addColorStop(0.7, bgColor[2])
          return bgGradient
        },
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  })

  //console.log(analytics?.conversation_duration_on_average)
  let barObj = analytics?.conversation_duration_on_average
  let barData = [
    { time: `0-2mins`, visitors: 0 },
    { time: `2-5min`, visitors: 0 },
    { time: `5-15min`, visitors: 0 },
    { time: `15-60mins`, visitors: 0 },
    { time: `1-2hrs`, visitors: 0 },
    { time: `2hrs+`, visitors: 0 },
  ]
  for (let prop in barObj) {
    let item = barObj[prop]
    if (prop <= 2) barData[0][`visitors`] = item
    if (prop >= 3 && prop <= 5) barData[1][`visitors`] = item
    if (prop >= 6 && prop <= 15) barData[2][`visitors`] = item
    if (prop >= 16 && prop <= 60) barData[3][`visitors`] = item
    if (prop >= 61 && prop <= 120) barData[4][`visitors`] = item
    if (prop > 120) barData[5][`visitors`] = item
  }
  //console.log(barData)

  barData.map((data) => {
    if (data.visitors > bigData) bigData = data?.visitors
  })

  barData.map((data) => {
    if (data.visitors === bigData) bgColor.push(`blue`)
    else bgColor.push(`#cfcccc`)
  })

  const [chartData2] = useState({
    labels: barData.map((data) => data.time),
    datasets: [
      {
        label: 'conversations ',
        data: barData.map((data) => data.visitors),

        backgroundColor: bgColor,
        borderWidth: 1,
      },
    ],
  })

  const { data: teamMate } = useSWR(`/companies/${id}/teammates/`)
  //console.log(`teamMate`, teamMate?.team)company
  const [showOperator, setShowOperators] = useState(false)

  const handleSelectDate = () => {
    handleNoOfDays(numberOfDays)
    setOpenDate(false)
  }

  // const handleSelectAdmin = () => {
  //   setShowOperators(!showOperator)
  // }

  return (
    <div className=" bg-white overflow-scroll h-[90vh] mt-20 no-scrollbar ">
      <div className=" py-7 px-5 text-xl font-medium">Analytics</div>
      <div className="p-5 bg-slate-100">
        <div className="flex relative justify-between ">
          <button
            onClick={() => setOpenDate(!openDate)}
            className="bg-white rounded-xl p-3 px-8 flex gap-5 font-bold shadow-md"
            title="click here to select the period of evaluation"
          >
            {numberOfDays > 0 && startDate ? (
              <>
                {startDuration} - {endDuration}
              </>
            ) : (
              `Select Period for Analysis`
            )}
            <DownIcon />
          </button>
          <button
            onClick={() => setShowOperators(!showOperator)}
            className="bg-white rounded-xl p-3 px-10 flex gap-36 gap font-bold shadow-md"
            title="Click here to display the operators managing this company"
          >
            Operators <DownIcon />
          </button>
        </div>
        <div className="flex  justify-around">
          <div>
            {openDate && (
              <ClickAwayListener onClickAway={() => setOpenDate(false)}>
                <div className="bg-gray-400 w-46 p-5 rounded-t-xl absolute text-center -ml-5 left-5 ">
                  <div className=" flex gap-5 ">
                    <div className="flex flex-col gap-3 ">
                      <label className="text-white ">Enter Start Data</label>
                      <input
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="rounded-lg p-1"
                        type="date"
                        id="date"
                        data-date-inline-picker="true"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-white">Enter End Date</label>
                      <input
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="rounded-lg p-1"
                        type="date"
                        id="date"
                        data-date-inline-picker="true"
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleSelectDate}
                    className="my-3 bg-white p-3 rounded-lg cursor-pointer text-gray-600"
                  >
                    {numberOfDays} days selected
                    <div className="text-xs italic text-blue-700">
                      click here to select
                    </div>
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
          <div>
            {showOperator && (
              <ClickAwayListener onClickAway={() => setShowOperators(false)}>
                <div
                  onClick={() => setShowOperators(false)}
                  className="bg-blue-600 w-46 p-5 rounded-xl absolute text-center right-9 cursor-pointer "
                >
                  {teamMate?.team.map((team, idx) => (
                    <div key={idx} className="flex gap-5 text-white">
                      <div>{team.user.name.toUpperCase()}</div>
                      <div className="text-black">{team.user.email}</div>
                      <div className="capitalize">{team.role}</div>
                    </div>
                  ))}
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>

        <ConversationAnalysis analytics={analytics} />

        <div className="flex gap-2 mt-20  ">
          <div className="w-full bg-white rounded-xl p-7">
            <div className="grid items-center grid-cols-2 ">
              <div className="flex gap-2">
                <span className="text-lg font-bold ">
                  Conversation Analytics
                </span>
                {/* <DownIcon /> */}
              </div>

              <div className="flex items-center justify-between">
                <span
                  onClick={() => handleValue(0)}
                  className={addClasses(`year`)}
                >
                  12 Months
                </span>
                <span
                  onClick={() => handleValue(1)}
                  className={addClasses(`month`)}
                >
                  30 Days
                </span>
                <span
                  onClick={() => handleValue(2)}
                  className={addClasses(`week`)}
                >
                  7 Days
                </span>
                {/* <span>
                  <PlusIcon />
                </span>{' '} */}
              </div>
            </div>
            {yearSelector ? (
              <FinalChart chartData={chartData} />
            ) : monthSelector ? (
              <FinalChartMonth chartDataMonth={chartDataMonth} />
            ) : daySelector ? (
              <FinalChartWeek chartDataWeek={chartDataWeek} />
            ) : (
              <FinalChart chartData={chartData} />
            )}
          </div>

          <div className="">
            <BarChart chartData={chartData2} />
          </div>
        </div>
        <div className="p-4 bg-white  my-10 rounded-lg ">
          <TopLocations />
        </div>
      </div>
    </div>
  )
}

export default AnalyticPage
