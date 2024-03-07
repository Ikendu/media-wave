import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { setPlan } from '../../../../store/reducers/pricing_reducer'
import Plan from './components/Plan'
import PlanDescription from './components/PlanDescription'

const Upgrade = () => {
  const [subscription, setSubscription] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState({
    id: '',
    name: 'Pay as you go',
    duration: 'monthly',
    price: '',
  })
  const { data: plans } = useSWR('subscription-plans')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subscribe = async () => {
    // TODO: make api call for plan subscription
    try {
      await axios
        .post('subscriptions/', {
          currency: 'naira',
          plan: selectedPlan?.id,
        })
        .then((res) => {
          dispatch(setPlan({ ...selectedPlan, data: res.data }))
          navigate('/dashboard/settings/billing/payment')
        })
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.detail, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  const handleChange = (event) => {
    setSelectedPlan(JSON.parse(event.target.value))
    const choosenPlan = plans?.filter(
      (plan) =>
        plan.name === selectedPlan.name &&
        plan.duration === selectedPlan.duration
    )
    dispatch(setPlan(choosenPlan))
  }

  return (
    <div className="p-8">
      <div className="w-full border bg-white shadow-lg opacity-80 p-4 pl-8 flex items-center space-x-5 text-[#225EA3] ">
        <CancelOutlinedIcon />
        <span className="font-semibold">Upgrade</span>
      </div>
      <div className="flex justify-center items-center pt-4 text-[#5E656C] text-lg tracking-wider font-semibold">
        <span>
          Choose a subscription plan below to unlock this special offer
        </span>
      </div>
      {/**Duration button */}
      <div className="flex justify-center pt-4 p-5">
        <div className="bg-gradient-to-tr from-gray-200 to-gray-50 p-2 rounded-md flex gap-1 pr-3">
          <button
            className={`p-2 px-4   ${
              subscription == 'monthly'
                ? 'bg-white shadow-md text-[#225EA3]'
                : 'text-[#434343]'
            } font-medium rounded-md`}
            onClick={() => setSubscription('monthly')}
          >
            Monthly
          </button>
          <button
            className={`p-2 px-4   ${
              subscription == 'yearly'
                ? 'bg-white shadow-md text-[#225EA3]'
                : 'text-[#434343]'
            } font-medium rounded-md`}
            onClick={() => setSubscription('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      {/** Plans */}
      <div className="flex gap-7 h-[100%]">
        <div className="flex flex-col space-y-4">
          {plans
            ?.filter((plan) => plan.duration === subscription)
            .map((plan) => (
              <Plan
                key={plan.id}
                selectedPlan={selectedPlan}
                handleChange={handleChange}
                plan={plan}
              />
            ))}
        </div>
        {/**Plan description */}
        <PlanDescription selectedPlan={selectedPlan} subscribe={subscribe} />
      </div>
    </div>
  )
}

export default Upgrade
