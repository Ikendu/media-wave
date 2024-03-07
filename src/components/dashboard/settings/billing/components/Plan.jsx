import { Radio } from '@mui/material'
import { blue } from '@mui/material/colors'
import TickIcon from '../../../../utils/icons/TickIcon'

const Plan = ({ selectedPlan, handleChange, plan }) => {
  return (
    <div className="flex flex-col border rounded-lg p-6 pb-14">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <Radio
            checked={
              selectedPlan?.name == plan?.name &&
              selectedPlan?.duration == plan?.duration
            }
            onChange={handleChange}
            value={JSON.stringify({
              id: plan?.id,
              name: plan?.name,
              duration: plan?.duration,
              price: plan?.price,
            })}
            name="radio-buttons"
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 30,
              },
              '&.Mui-checked': {
                color: blue[800],
              },
            }}
          />
          <span className="font-medium">
            {plan.name?.charAt(0).toUpperCase() + plan?.name.slice(1)} Plan
          </span>
        </div>
        {plan?.name !== 'free' && (
          <div>
            <span className="font-semibold">${plan.price}</span>
          </div>
        )}
      </div>
      {plan?.name !== 'free' && (
        <div className="pl-16 grid grid-cols-2 gap-8 mt-6 text-sm text-[#616161]">
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>200+ Templates</span>
          </div>
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>Unlimited Emails</span>
          </div>
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>24/7 Support</span>
          </div>
          <div className="flex space-x-4 items-center">
            <TickIcon />
            <span>Unlimited Automations</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Plan
