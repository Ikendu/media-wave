import { Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNotificationSetting } from '../../../../store/reducers/dashboard_reducer'
import ArrowBackIcon from '../../../utils/icons/ArrowBackIcon'

function NotificationSettings() {
  const dispatch = useDispatch()
  const notificationSetting = useSelector(
    (state) => state.dashboard.notificationSetting
  )

  const [setting, setSetting] = useState({
    newMessage: notificationSetting?.newMessage || false,
    repeatMessage: notificationSetting?.repeatMessage || false,
    newVisitor: notificationSetting?.newVisitor || false,
  })

  useEffect(() => {
    dispatch(setNotificationSetting(setting))
  }, [dispatch, setting])

  return (
    <div className="flex mt-24 h-[520px] mx-10 flex-col gap-4 overflow-y-auto p-2 md:p-5 lg:p-10 pt-0  border border-gray-400 ">
      <Link to="/dashboard/notifications">
        <ArrowBackIcon />
      </Link>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex justify-between px-24  border p-6">
          <div className="flex flex-col gap-1">
            <span className="text-lg text-[#415E96]">New Messages</span>
            <span className="text-sm w-[507px]">
              Play a sound when you receive a message from a visitor
            </span>
          </div>
          <div>
            <Switch
              checked={notificationSetting?.newMessage}
              onChange={() =>
                setSetting({ ...setting, newMessage: !setting?.newMessage })
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
        <div className="flex justify-between px-24  border p-6">
          <div className="flex flex-col gap-1">
            <span className="text-lg text-[#415E96]">
              Repeat new messsage notifications
            </span>
            <span className="text-sm w-[507px]">
              Repeat new message notification until you open the message or
              dismiss the notification{' '}
            </span>
          </div>
          <div>
            <Switch
              checked={notificationSetting?.repeatMessage}
              onChange={() =>
                setSetting({
                  ...setting,
                  repeatMessage: !setting?.repeatMessage,
                })
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
        <div className="flex justify-between px-24  border p-6">
          <div className="flex flex-col gap-1">
            <span className="text-lg text-[#415E96]">New Messages</span>
            <span className="text-sm w-[507px]">
              Play a sound when you receive a message from a visitor
            </span>
          </div>
          <div>
            <Switch
              checked={notificationSetting?.newVisitor}
              onChange={() =>
                setSetting({ ...setting, newVisitor: !setting?.newVisitor })
              }
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
