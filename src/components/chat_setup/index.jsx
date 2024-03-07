import { useDispatch, useSelector } from 'react-redux'

import { Cookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import andromedia from '../../assets/andromedia.png'
import login_preview from '../../assets/images/about/login_preview.png'
import preview5 from '../../assets/images/about/preview5.png'
import {
  setAllCompanies,
  setSelectedComp,
  setUserData,
} from '../../store/reducers/auth_reducer'
import { setChatStep } from '../../store/reducers/chat_reducer'
import { setSelectedCompany } from '../../store/reducers/dashboard_reducer'
import ChatScript from './ChatScript'
import ChatSetup from './ChatSetup'
import ChatWelcomeMessage from './ChatWelcomeMessage'
import CompanyDetails from './CompanyDetails'
import StepIndicator from './StepIndicator'

const CompanySetup = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const chatStep = useSelector((state) => state.chat.chatStep)
  const cookie = new Cookies()

  const pageComponents = [
    ChatSetup,
    CompanyDetails,
    ChatWelcomeMessage,
    ChatScript,
  ]
  const Page = pageComponents[chatStep]

  const handleNext = (page) => {
    dispatch(setChatStep(page))
  }

  const handleClose = () => {
    handleNext(0)
  }

  const handleSignout = () => {
    cookie.remove(`access_token`)
    cookie.remove(`user`)
    cookie.remove(`company`)
    dispatch(setUserData(null))
    dispatch(setAllCompanies(null))
    dispatch(setSelectedComp(null))
    dispatch(setSelectedCompany(null))
    history('/')
    window.location.reload()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center px-2 md:px-14 py-2 md:py-5">
        <Link to={'/'}>
          <div className="flex items-center cursor-pointer">
            <div className="w-16 h-16">
              <img src={andromedia} />
            </div>
          </div>
        </Link>

        <button
          onClick={handleSignout}
          className="w-[6rem] outline-none font-semibold text-sm text-white rounded-xl bg-[#3e7ede] border-2 border-[#3e7ede] p-2 shadow-md z-20"
        >
          Sign out
        </button>
      </div>
      <div className="mb-[2rem]">
        <StepIndicator chatStep={chatStep} />
        <p className="text-[#2D80E0] text-sm font-semibold uppercase text-center mt-[1rem]">{`step ${
          chatStep + 1
        }`}</p>
      </div>
      <Page handleNext={handleNext} handleClose={handleClose} />

      <img
        src={preview5}
        alt=""
        className="fixed top-0 opacity-20 -right-16 -z-10 md:z-0 h-[25rem]"
      />
      <img
        src={login_preview}
        alt=""
        className="fixed -bottom-28 -left-16 opacity-20 -z-10 md:z-0 h-[25rem]"
      />
    </div>
  )
}

export default CompanySetup
