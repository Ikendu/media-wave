import { Bar } from 'react-chartjs-2'

const BarChart = ({ chartData }) => {
  return (
    <div className="text-center bg-white p-2 rounded-lg">
      <div className=" mb-2">
        <h2 className="font-bold text-lg m-2">Conversation Durations</h2>
        <h3 className="font-bold text-lg m-2 text-gray-500">On average</h3>
        <h3 className="font-bold  m-2 text-2xl text-gray-600">10 hrs</h3>
      </div>

      <Bar
        className="w-80"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: 'Users Gained between 2016-2020',
            },
            legend: {
              display: false,
            },
            maintainAspectRatio: false,
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                fontSize: 20,
                autoSkip: false,
                font: { size: 10 },
                color: '#888585',
              },
            },
            y: {
              grid: { display: false },
              border: { display: false },
              ticks: { display: false },
            },
          },
          categoryPercentage: 1,
          barPercentage: 0.5,
        }}
      />
    </div>
  )
}
export default BarChart
