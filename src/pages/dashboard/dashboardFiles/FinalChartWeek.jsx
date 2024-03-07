import { Line } from 'react-chartjs-2'

const FinalChartWeek = ({ chartDataWeek }) => {
  return (
    <div className="">
      <Line
        data={chartDataWeek}
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

export default FinalChartWeek
