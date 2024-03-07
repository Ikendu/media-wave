import { ClickAwayListener } from '@mui/material'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  setAllCompanies,
  setSelectedComp,
  setUserData,
} from '../../store/reducers/auth_reducer'
import {
  setSettingsImageUrl,
  setSetupImageUrl,
} from '../../store/reducers/chat_reducer'
import { setSelectedCompany } from '../../store/reducers/dashboard_reducer'
import EditIcon from '../utils/icons/EditIcon'
import LogoutIcon from '../utils/icons/LogoutIcon'
import UserNoticeIcon from '../utils/icons/UserNoticeIcon'

const cookie = new Cookies()

const UserLogout = () => {
  const [openLogout, setOpenLogout] = useState(false)
  const { userData } = useSelector((state) => state.auth)

  //console.log(`UserData`, userData)

  let userInitial = userData?.name?.split(``)[0]?.toUpperCase()
  //console.log(`userInitial`, userInitial)

  return (
    <div className="relative">
      <div
        onClick={() => setOpenLogout(!openLogout)}
        className="bg-white px-2 rounded-md text-[#f7a4a4] text-xl font-semibold relative"
      >
        <button>{userInitial}</button>
        <div className="absolute right-0 -bottom-1">
          <UserNoticeIcon />
        </div>
      </div>
      <LogoutEditPage openLogout={openLogout} setOpenLogout={setOpenLogout} />
    </div>
  )
}

export const LogoutEditPage = ({ openLogout, setOpenLogout }) => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const logoutOption = () => {
    history('/')
    cookie.remove(`access_token`)
    cookie.remove(`user`)
    cookie.remove(`company`)
    dispatch(setUserData(null))
    dispatch(setAllCompanies(null))
    dispatch(setSelectedComp(null))
    dispatch(setSelectedCompany(null))
    dispatch(setSetupImageUrl(null))
    dispatch(setSettingsImageUrl(null))
    window.location.reload()
  }

  return (
    <>
      {openLogout && (
        <ClickAwayListener onClickAway={() => setOpenLogout(false)}>
          <div className="absolute -right-28 -bottom-28 p-3 bg-white shadow-lg shadow-gray-500 rounded-md ">
            <div className="text-gray-600 flex flex-col gap-5 pt-3">
              <Link
                to={`settings`}
                className="flex gap-2 items-center "
                title="Click here to edit you profile"
              >
                <EditIcon /> Edit profile
              </Link>
              <div
                onClick={logoutOption}
                className="flex gap-2 items-center"
                title="Click here to logout from your dashboard"
              >
                <LogoutIcon /> Logout
              </div>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </>
  )
}

export default UserLogout
