import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import andromedia from '../../assets/andromedia.png'

const ProgressBarPage = () => {
  const [level, setLevel] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setLevel((newLevel) => (newLevel >= 100 ? 0 : newLevel + 20))
      //setLevel((newLevel) => newLevel + 2)
    }, 500)
    return () => clearInterval(timerId)
  })
  return (
    <div className="bg-gray-100 fixed top-0 left-0 w-full h-full items-center z-50">
      <div className="items-center mt-48 w-2/4 m-auto justify-center">
        <div className="w-16 gap-14 m-auto">
          <div className="w-24 h-24 mt-20">
            <img src={andromedia} />
          </div>
          <p className="mb-4 text-center text-blue-700 text-sm font-semibold">
            ANDROMEDIA
          </p>
        </div>

        <div className=" m-auto ">
          <LinearProgress
            color="primary"
            variant="determinate"
            value={level}
            style={{ height: 20 }}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
export default ProgressBarPage
