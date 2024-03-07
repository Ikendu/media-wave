import { Line } from 'react-chartjs-2'

function VisitorsChart({ chartData }) {
  return (
    <div className="pl-5">
      <Line
        data={chartData}
        options={{
          tension: 0.4,
          pointRadius: 10,
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              ticks: {
                maxTicksLimit: 8,
              },
            },
            x: { grid: { display: false } },
          },
        }}
      />
    </div>
  )
}
export default VisitorsChart
