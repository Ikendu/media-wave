import Dashboard from './dashboardFiles/Dashboard'
import Summary from './dashboardFiles/Summary'

function App() {
  return (
    <div className=" bg-slate-50 overflow-scroll h-[90vh] mt-20 no-scrollbar ">
      <div className="p-5">
        <Dashboard />
      </div>
      <Summary />
    </div>
  )
}

export default App
