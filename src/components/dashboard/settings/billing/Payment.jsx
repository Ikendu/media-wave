import { useState } from 'react'
// import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import { useSelector } from 'react-redux'
import StripeIcon from '../../../utils/icons/StripeIcon'

const Payment = () => {
  const [subscription, setSubscription] = useState('monthly')
  const selectedPlan = useSelector((state) => state.pricing?.selectedPlan)
  const selectedComp = useSelector((state) => state.auth?.selectedComp)
  const [isLoading, setIsLoading] = useState(false)

  const payWithPaystack = async () => {
    try {
      setIsLoading(true)
      const body = {
        reference_id: selectedPlan?.data?.id,
        payment_channel: 'paystack',
        subscription: selectedPlan?.data?.id,
      }
      await axios.post('payments/', body).then((res) => {
        const authorizationUrl =
          res?.data?.data?.payment_response?.data?.authorization_url
        window.location.href = authorizationUrl
        setIsLoading(false)
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-14 w-[628px] h-screen flex flex-col space-y-4">
      <div className="flex relative justify-center mb-4">
        <div className="w-[80%] border border-b-gray-400 bg-black"></div>
        <div className="absolute px-4 -top-4 bg-white">
          <span className="text-2xl">
            Invoice#{selectedPlan?.id?.substring(0, 6)}
          </span>
        </div>
      </div>
      <div className="bg-[#F8F7FA] pb-12">
        <div className="flex justify-center pt-4 p-5 pb-10">
          <div className="bg-gradient-to-tr from-gray-200 to-gray-50 p-2 rounded-md flex gap-1 pr-3">
            <button
              className={`p-2 px-4   ${
                subscription == 'monthly'
                  ? 'bg-white shadow-md text-[#225EA3]'
                  : 'text-[#434343]'
              } font-medium rounded-md`}
              onClick={() => setSubscription('monthly')}
            >
              {selectedPlan?.duration}
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center text-[#393185] px-12 border-b-[#EBE4E4] border-b pb-4">
          <div>
            <span>Property</span>
          </div>
          <div>
            <span>{selectedComp?.name}</span>
          </div>
        </div>
        <div className="flex justify-between text-[#0C396D] items-center px-12 py-5">
          <div>
            <span>Subtotal</span>
          </div>
          <div>
            <span>${selectedPlan?.price}</span>
          </div>
        </div>
        <div className="flex justify-between text-[#0C396D] items-center px-12">
          <div>
            <span>Subtotal</span>
          </div>
          <div>
            <span className="text-3xl font-semibold">
              ${selectedPlan?.price}
            </span>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <span className="text-xs text-[#999]">
            You will be billed $29.00/month. You can cancel at anytime.
          </span>
        </div>
      </div>
      <div className="w-full text-[#393185] pl-6 p-2 bg-[#F8F7FA]">
        Select a payment method
      </div>
      <div className="pb-2 flex justify-between items-center">
        <button
          className={`flex items-center space-x-3 bg-white ${isLoading && 'w-[200px] justify-center'} bg-opacity-70 p-3 drop-shadow-lg`}
          onClick={payWithPaystack}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <>
              <div className="bg-[#47E6B1] rounded-md px-2 py-1 flex justify-center items-center">
                <span className="text-xs text-[#164966] font-semibold ">
                  Paystack
                </span>
              </div>
              <span>Pay with Paystack</span>
            </>
          )}
        </button>
        <button className="flex items-center space-x-3 bg-white bg-opacity-70 p-3 drop-shadow-lg">
          <StripeIcon />
          <span>Pay with Stripe</span>
        </button>
      </div>
    </div>
  )
}

export default Payment
