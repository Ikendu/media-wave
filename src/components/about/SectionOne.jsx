import { useNavigate } from 'react-router-dom'
import robo from '../utils/svgs/roboo.svg'

const SectionOne = () => {
  const history = useNavigate()
  const access_token = localStorage.getItem('access_token')

  const getStarted = () => {
    if (access_token) {
      history('/company/setup')
    } else {
      history('/signin')
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-evenly gap-14 px-7 md:px-12 lg:px-20 py-7 bg-opacity-30">
      <div className="">
        <img src={robo} alt="" className="h-[500px] w-[500px]" />
      </div>
      <div className="flex-1 max-w-[35rem] flex flex-col gap-7">
        <p className="text-[#111B3D] text-2xl">
          We&apos;re passionate about transforming the way businesses connect
          with their customers.{' '}
        </p>

        <p className="text-[#5E516F] text-lg">
          We aim to empower businesses of all sizes to build stronger, more
          meaningful relationships with their customers. We believe that every
          interaction is an opportunity to create a positive impact, and
          we&apos;re here to make those interactions seamless and memorable.
        </p>

        <button
          onClick={getStarted}
          className="bg-[#71BDFF] text-white rounded-sm border-none outline-none py-3 px-3 mt-9 w-[10rem] font-medium"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default SectionOne
