import { CircularProgress, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { useRef, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteContact,
} from '../../../store/reducers/contacts_reducer'
import {
  setIsEditContact,
  setIsModalOpen,
  setSelectedContact,
  setShowAddContact,
} from '../../../store/reducers/dashboard_reducer'
import { useClickAway } from '../../common/useClickAway'
import DeleteContactIcon from '../../utils/icons/DeleteContactIcon'
import EditContactIcon from '../../utils/icons/EditContactIcon'
import ThreeDotsIcon from '../../utils/icons/ThreeDotsIcon'

const Contacts = () => {
  const dispatch = useDispatch()
  const moreOptionsRef = useRef(null)
  const cookie = new Cookies()
  const companyId = cookie.get('company')?.id
  console.log(cookie.get('company'))

  useClickAway(moreOptionsRef, () => setOpenMoreOptions(null))
  const selectedContact = useSelector(
    (state) => state.dashboard.selectedContact
  )
  const contacts = useSelector((state) => state.contacts.items)
  const isModalOpen = useSelector((state) => state.dashboard.isModalOpen)
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')
  const [openMoreOptions, setOpenMoreOptions] = useState(null)

  const toggleMoreOptionsMenu = (contactId) => {
    setOpenMoreOptions((prevOpenMoreOptions) =>
      prevOpenMoreOptions === contactId ? null : contactId
    )
  }
  const handleEditOption = () => {
    dispatch(setIsEditContact(true))
    setOpenMoreOptions(null)
  }

  const handleDeleteOption = async (contactId) => {
    try {
      dispatch(deleteContact(contactId))
      setOpenMoreOptions(null)
      await axios.delete(`companies/${companyId}/customers/${contactId}`)
      if (contacts && contacts.length > 0) {
        dispatch(setSelectedContact(contacts[0].id))
      }
    } catch (error) {
      console.log('Error deleting the contact', error)
    }
  }
  
  if (!contacts) {
    return <CircularProgress color="secondary" thickness={10} size={18} />
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-[1fr,1.5fr,1fr,0.5fr] items-center p-3">
        <p className="text-xs lg:text-sm font-semibold">Name</p>
        <p className="text-xs lg:text-sm font-semibold">Email</p>
        <p className="text-xs lg:text-sm font-semibold">Phone Number</p>
        <p></p>
      </div>
      {contacts?.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            dispatch(setShowAddContact(false))
            dispatch(setSelectedContact(item?.id))
            if (isMediumScreen) {
              dispatch(setIsModalOpen(!isModalOpen))
            }
          }}
          className={`relative flex items-center justify-between py-4 px-3 cursor-pointer rounded-md shadow-md mt-[0.5rem] ${
            selectedContact === item?.id ? 'bg-[#2D80E0]' : 'bg-white '
          }`}
        >
          <p
            className={`text-xs lg:text-sm font-medium text-[#030229] overflow-hidden overflow-ellipsis ${
              selectedContact === item?.id ? 'text-[#fff]' : 'text-[#030229]'
            }`}
          >
            {item?.name}
          </p>
          <p
            className={`text-xs lg:text-sm font-medium text-[#030229] overflow-hidden overflow-ellipsis ${
              selectedContact === item?.id ? 'text-[#fff]' : 'text-[#030229]'
            }`}
          >
            {item?.email}
          </p>
          <p
            className={`text-xs lg:text-sm font-medium text-[#030229] overflow-hidden overflow-ellipsis ${
              selectedContact === item?.id ? 'text-[#fff]' : 'text-[#030229]'
            }`}
          >
            {item?.phone}
          </p>
          <p
            onClick={() => toggleMoreOptionsMenu(item?.id)}
            className="flex items-center justify-end"
          >
            <ThreeDotsIcon isSelected={selectedContact === item?.id} />
          </p>
          {openMoreOptions === item?.id && (
            <div
              className="grid gap-2 p-2 absolute top-[80%] right-0 bg-[#fff] shadow-lg rounded-lg z-50 min-w-[120px]"
              ref={moreOptionsRef}
            >
              <div
                className="cursor-pointer p-1 flex gap-3 items-center bg-[#15ACF5] bg-opacity-5 rounded-md"
                onClick={handleEditOption}
              >
                <EditContactIcon />
                <h4 className="text-sm text-[#15ACF5]">Edit</h4>
              </div>
              <div
                className="cursor-pointer p-1 flex gap-3 items-center bg-[#15ACF5] bg-opacity-5 rounded-md"
                onClick={() => handleDeleteOption(item?.id)}
              >
                <DeleteContactIcon />
                <h4 className="text-sm text-[#15ACF5]">Delete</h4>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Contacts
