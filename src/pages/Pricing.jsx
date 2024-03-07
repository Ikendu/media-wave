import { useNavigate } from 'react-router-dom'
import PricingContainer from '../components/PricingContainer'

const Pricing = () => {
  const navigate = useNavigate()

  return (
    <div className="px-7 md:px-12 lg:px-20 py-14 bg-[#152D48] w-full min-h-[100vh] flex flex-col items-center gap-7">
      <p className="text-white text-2xl font-medium text-center">
        Communicate with your Clients in Real Time with our
      </p>
      <PricingContainer />
      <button
        onClick={() => navigate(-1)}
        className="bg-transparent py-2 px-5 text-sm text-white font-medium border border-white rounded-sm"
      >
        Back
      </button>
    </div>
  )
}

export default Pricing
