import { useDispatch } from 'react-redux'
import { setChatStep } from '../../store/reducers/chat_reducer'

const items = [0, 1, 2, 3]

const StepIndicator = ({ chatStep }) => {
  const dispatch = useDispatch()

  const navigateSteps = (step) => {
    dispatch(setChatStep(step))
  }

  return (
    <div className="flex items-center relative gap-2">
      {items?.map((item) => (
        <div
          key={item}
          className={
            chatStep === item
              ? 'h-[3rem] w-[3rem] bg-[#DDEBFA] rounded-full z-10 cursor-pointer flex items-center justify-center'
              : 'h-[3rem] w-[3rem] bg-transparent rounded-full z-10 cursor-pointer flex items-center justify-center'
          }
          onClick={() => navigateSteps(item)}
        >
          <div
            key={item}
            className={
              chatStep === item
                ? 'h-[1.5rem] w-[1.5rem] bg-[#2D80E0] rounded-full z-10 cursor-pointer'
                : 'h-[1.5rem] w-[1.5rem] bg-[#DDEBFA] rounded-full z-10 cursor-pointer'
            }
          ></div>
        </div>
      ))}

      <div className="absolute border border-[#DDEBFA] w-[85%] left-3"></div>
    </div>
  )
}

export default StepIndicator
