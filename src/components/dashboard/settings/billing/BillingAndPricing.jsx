import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { capitalizeString } from '../../../../helpers/capitalizeString'
import ArrowDownIcon from '../../../utils/icons/ArrowDownIcon'
import ArrowUpIcon from '../../../utils/icons/ArrowUpIcon'
import Invoice from './components/Invoice'

const BillingAndPricing = () => {
  const [clicked, setClicked] = useState(false)
  const { data: invoices } = useSWR('subscriptions')

  const currentPlan = invoices ? invoices[invoices?.length - 1] : null

  return (
    <div
      className={`bg-[#F7F7F8] ${
        clicked ? 'h-[100%]' : 'h-screen'
      }  p-12 px-20 space-y-10`}
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold">Billing</span>
        <span className="text-gray-600">
          Effortlessly handle your billing and invoices right here.
        </span>
      </div>
      <div>
        <div className="flex justify-between px-4 shadow-gray-200 shadow-lg bg-[#F8F8F8] p-3">
          <div>
            <span className="font-medium text-[#2C2C2C]">Current Plan</span>
          </div>
          <div className="flex space-x-4 font-semibold">
            <Link
              className="border border-[#2D80E0] text-[#2D80E0] p-1 text-sm px-5 rounded-md"
              to="/dashboard/settings/billing/upgrade"
            >
              Pay
            </Link>
            {/* <Link
              className="bg-[#2D80E0] text-white p-1 text-sm px-5 rounded-md"
              to="/dashboard/settings/billing/payment"
            >
              Renew
            </Link> */}
          </div>
        </div>
        <div className="flex flex-col p-4 px-4 bg-white opacity-80 space-y-2 mt-1">
          <div className="flex text-[16px] justify-between w-[550px] text-sm text-gray-500">
            <span className="w-[100px]">Plan Name</span>
            <span className="w-[100px]">Billing Cycle</span>
            <span className="w-[100px]">Plan Cost</span>
          </div>
          <div className="flex justify-between w-[550px] font-bold">
            <span className="w-[100px]">
              {(currentPlan && capitalizeString(currentPlan?.plan?.name)) ||
                'Free'}
            </span>
            <span className=" w-[100px]">
              {(currentPlan && capitalizeString(currentPlan?.plan?.duration)) ||
                ''}
            </span>
            <span className="w-[100px]">
              ${(currentPlan && currentPlan?.plan?.price) || '0.0'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-medium text-[#225EA3]">Invoice</span>
          <span className="text-xs pt-2">
            Effortlessly handle your billing and invoices right here.
          </span>
        </div>
        <button onClick={() => setClicked(!clicked)}>
          {clicked ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      {clicked && (
        <div className="flex space-y-4 flex-col border-t-2 border-gray-200 pt-10">
          <div className="px-8 flex justify-between text-xs items-center">
            <span className="w-[15%]">Invoice ID</span>
            <span className="w-[15%]">Billing Date</span>
            <span className="w-[15%]">Plan</span>
            <span className="w-[15%]">Amount</span>
            <span className="w-[20%]">Status </span>
          </div>

          {invoices?.map((invoice) => (
            <Invoice key={invoice?.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BillingAndPricing
