import { Cookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import andromedia from '../../assets/andromedia.png'
import {
  setAllCompanies,
  setSelectedComp,
  setUserData,
} from '../../store/reducers/auth_reducer'
import {
  setSettingsImageUrl,
  setSetupImageUrl,
} from '../../store/reducers/chat_reducer'
import {
  setSelectedCompany,
  setSidebarActivePage,
} from '../../store/reducers/dashboard_reducer'

const NewHeader = () => {
  const history = useNavigate()
  //const access_token = localStorage.getItem('access_token')
  //const current_company_id = localStorage.getItem('current_company_id')
  const cookie = new Cookies()
  const access_token = cookie.get(`access_token`)
  const user = cookie.get(`user`)
  const dispatch = useDispatch()

  const handleSignout = () => {
    cookie.remove(`access_token`)
    cookie.remove(`user`)
    cookie.remove(`company`)
    dispatch(setUserData(null))
    dispatch(setAllCompanies(null))
    dispatch(setSelectedComp(null))
    dispatch(setSelectedCompany(null))
    dispatch(setSetupImageUrl(null))
    dispatch(setSettingsImageUrl(null))
    history('/')
    window.location.reload()
  }

  return (
    <div className="flex justify-between py-4 px-2 md:px-5 lg:px-10">
      <div
        onClick={() => history('/')}
        className="flex items-center cursor-pointer"
      >
        <div className="w-16 h-16">
          <img src={andromedia} />
          {/* <AndroMediaIcon /> */}
        </div>

        {/* <p className="text-[#3592FF] font-semibold text-lg -ml-2">ANDROMEDIA</p> */}
      </div>

      <div className="hidden md:flex items-center gap-5 font-medium">
        <div className="flex items-center gap-7">
          {access_token && (
            <p
              onClick={() => history('/application')}
              className="text-[#080F1A] cursor-pointer"
            >
              Download
            </p>
          )}
          <p
            onClick={() => history('/pricing')}
            className="text-[#080F1A] cursor-pointer"
          >
            Pricing
          </p>

          {access_token && (
            <p
              onClick={() => {
                dispatch(setSidebarActivePage('Dashboard'))
                history('/dashboard')
              }}
              className="text-[#080F1A] cursor-pointer"
            >
              Dashboard
            </p>
          )}
        </div>
        {access_token && user ? (
          <p
            onClick={handleSignout}
            className="cursor-pointer py-3 px-5 text-[#fff] bg-[#4789F2] rounded-xl text-sm font-semibold"
          >
            Sign out
          </p>
        ) : (
          <p
            onClick={() => history('/login')}
            className="cursor-pointer py-3 px-5 text-[#fff] bg-[#4789F2] rounded-xl text-sm font-semibold"
          >
            Log in
          </p>
        )}

        <p
          onClick={() => {
            if (access_token) {
              history('/company/setup')
            } else {
              history('/register')
            }
          }}
          className="cursor-pointer py-3 px-5 text-[#080F1A] border borrder-[#EFF2F6] rounded-xl text-sm font-semibold"
        >
          Get Started
        </p>
      </div>
    </div>
  )
}

export default NewHeader
