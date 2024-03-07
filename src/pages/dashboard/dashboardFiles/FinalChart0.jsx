import { useState } from 'react'
import { Line } from 'react-chartjs-2'

const FinalChart = ({ chartData }) => {
  const [value, setValue] = useState(0)
  let selector = [`year`, `month`, `week`]

  function addClasses(type = null) {
    let style = `text-gray-600 font-semibold p-1 px-3 cursor-pointer`
    if (type === selector[value]) {
      style += ` bg-blue-600 text-white rounded-lg`
    }
    return style
  }

  const handleValue = (num) => {
    setValue(num)
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 items-center ">
        <div className="flex gap-2">
          <span className=" font-bold text-lg">Conversation Analytics</span>
          {/* <DownIcon /> */}
        </div>

        <div className="flex justify-between  items-center">
          <span onClick={() => handleValue(0)} className={addClasses(`year`)}>
            12 Months
          </span>
          <span onClick={() => handleValue(1)} className={addClasses(`month`)}>
            30 Days
          </span>
          <span onClick={() => handleValue(2)} className={addClasses(`week`)}>
            7 Days
          </span>
        </div>
      </div>
      <Line
        data={chartData}
        options={{
          tension: 0.4,
          pointRadius: 0,
          elements: {
            point: {
              hoverRadius: 10,
              hoverBackgroundColor: `green`,
              hoverBorderColor: `green`,
            },
          },
          hover: { mode: `index`, intersect: false },
          plugins: {
            title: {
              display: true,
            },
            legend: { display: false },
          },
          scales: {
            x: {
              ticks: { maxTicksLimit: 12 },
              grid: { display: false },
            },
            y: {
              ticks: { maxTicksLimit: 8, display: false },
              border: { display: false },
            },
          },
        }}
      />
    </div>
  )
}
export default FinalChart
