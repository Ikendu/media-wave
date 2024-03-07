import { capitalizeString } from '../../../../../helpers/capitalizeString'
import TickIcon from '../../../../utils/icons/TickIcon'

const PlanDescription = ({ selectedPlan, subscribe }) => {
  return (
    <div className="flex-1  bg-[#F8F7FA] p-16">
      <div className="pb-10 ">
        <span className="text-3xl">{capitalizeString(selectedPlan.name)}</span>
      </div>
      {selectedPlan?.name !== 'free' && (
        <div className="flex flex-col gap-6 mb-10 text-[#616161]">
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>200+ Templates</span>
          </div>
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>24/7 Support</span>
          </div>
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>Unlimited Emails</span>
          </div>
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>Unlimited Automations</span>
          </div>
        </div>
      )}

      <div className="w-full">
        <button
          className="bg-[#225EA3] w-full p-2 flex justify-center items-center  rounded-lg text-white font-semibold"
          onClick={subscribe}
        >
          <span>Choose Plan</span>
        </button>
      </div>
    </div>
  )
}

export default PlanDescription
