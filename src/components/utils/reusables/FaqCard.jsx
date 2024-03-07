import { useState } from 'react'
import CancelIcon from '../icons/CancelIcon'
import PlusIcon from '../icons/PlusIcon'

const FaqCard = ({ item }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="p-5 rounded-sm border border-[#BEC7CC] mb-[1rem]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#575D60]">{item?.question}</p>
        <div onClick={() => setShow(!show)} className="cursor-pointer">
          {show ? <CancelIcon /> : <PlusIcon />}
        </div>
      </div>

      {show && (
        <p className="text-[#575D60] font-light text-sm px-5">{item?.answer}</p>
      )}
    </div>
  )
}

export default FaqCard
