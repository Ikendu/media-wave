import { useCallback, useEffect, useState } from 'react'

import { ClickAwayListener } from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import CallIcon from '../../components/utils/icons/CallIcon'
import EyeIcon from '../../components/utils/icons/EyeIcon'
import LocationIcon1 from '../../components/utils/icons/LocationIcon1'
import MessageIcon from '../../components/utils/icons/MessageIcon'
import NotesIcon from '../../components/utils/icons/NotesIcon'
import PlusNoteIcon from '../../components/utils/icons/PlusNoteIcon'
import TelevisionIcon from '../../components/utils/icons/TelevisionIcon'
import UserIcon from '../../components/utils/icons/UserIcon'
import { handleGenericError } from '../../hooks/errorHandler'
import user from './Icons/user.svg'
import wifiIcon from './Icons/wifiIcon.svg'
import ViewedPages from './ViewedPages'

const UsersDetails = ({ details }) => {
  const [addNote, setAddNote] = useState(false)
  const [viewedPage, setViewedPage] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(true)
  const { selectedCompany } = useSelector((state) => state.dashboard)
  const [selectUser, setSelectUser] = useState(``)

  const { data: customer } = useSWR(
    `/companies/${selectedCompany}/customers/${details?.customer?.id}/`
  )

  const [noteChange, setNoteChange] = useState(``)
  const { data: teammates } = useSWR(`/companies/${selectedCompany}/teammates/`)
  const { data: pagesVisited } = useSWR(
    `/pages-visited/${selectedCompany}/create/?conversation_id=${details.id}`
  )

  const handleViewedPages = () => {
    setViewedPage(true)
    setShowUserInfo(false)
  }
  const handleUserInfo = () => {
    setViewedPage(false)
    setShowUserInfo(true)
  }
  const sendNote = async () => {
    if (noteChange == ``) return toast.warning(`Empty Note, try again`)
    //console.log(`NOTE`, noteChange, details.customer, customer)
    try {
      await axios.patch(
        `companies/${selectedCompany}/customers/${details.customer?.id}/`,
        { ...customer, notes: noteChange }
      )
      setNoteChange(``)
      toast.success(`Note delivered`)
    } catch (error) {
      const errorMesg = handleGenericError(error)
      toast.error(errorMesg)
      console.log(error)
    }
  }

  // const selecectTeamMate = async (userId) => {
  //   console.log(`USERID`, userId)
  //   console.log(`DETAILS`, details)
  //   try {
  //     const response = await axios.post(
  //       `conversations/assign/operator/${selectedCompany}/${details.id}/`,
  //       { department_id: ``, user_id: userId }
  //     )
  //     console.log(`Response`, response)
  //     toast.success(`Operator Selected`)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const selecectTeamMate = useCallback(async () => {
    try {
      const response = await axios.post(
        `conversations/assign/operator/${selectedCompany}/${details?.id}/`,
        { department_id: ``, user_id: selectUser }
      )
      console.log(`Response`, response)
      toast.success(`Assignee Selected`)
    } catch (error) {
      console.log(error)
    }
  }, [selectUser, details?.id, selectedCompany])

  useEffect(() => {
    selecectTeamMate(selectUser)
  }, [selectUser, selecectTeamMate])

  const handleSelectUser = (e) => {
    setSelectUser(e.target.value)
  }
  console.log(`SELECTED VALUE`, selectUser)

  return (
    <div>
      <div className=" bg-white relative border-2 w-full overflow-scroll h-[90vh] mt-20 no-scrollbar ">
        <div>
          <div className="flex gap-3 mt-5 m-4 cursor-pointer text-sm">
            <p
              onClick={handleUserInfo}
              className={
                showUserInfo ? 'text-[#000] font-semibold' : 'text-gray-500'
              }
            >
              Info
            </p>
            <div onClick={handleViewedPages} className=" ">
              <p
                className={
                  viewedPage ? 'text-[#000] font-semibold' : 'text-gray-500'
                }
              >
                Viewed pages
              </p>
            </div>
          </div>
          <hr />
          <>
            {viewedPage && <ViewedPages details={details} />}
            {showUserInfo && (
              <div
                key={details?.id}
                className="m-4 mt-7 p-5  border shadow-lg shadow-gray-400 border-t-0 grid grid-col gap-8 text-gray-500"
              >
                <div className="flex gap-3 items-center">
                  <UserIcon />
                  <p>{details?.customer?.name}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <MessageIcon />
                  <p>{details?.customer?.email} </p>
                </div>
                <div className="flex gap-3 items-center">
                  <CallIcon />
                  <p>{details?.customer?.phone}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <LocationIcon1 />
                  <p>{details?.customer?.location}</p>
                </div>
                <div className="flex gap-3">
                  <img src={wifiIcon} /> {details?.customer?.ip_address}
                </div>
                <div className="flex gap-3 items-center">
                  {/* <ComputerIcon /> */}
                  <TelevisionIcon />
                  <p>{details?.customer?.browser}</p>
                </div>

                <div className=" cursor-pointer">
                  <div
                    onClick={() => setAddNote(!addNote)}
                    className="flex gap-3 items-center"
                  >
                    {/* <NoteIcon /> */}
                    <NotesIcon />
                    <p>Add Note</p>
                    <PlusNoteIcon />
                  </div>

                  {addNote && (
                    <ClickAwayListener onClickAway={() => setAddNote(false)}>
                      <div>
                        <textarea
                          value={noteChange}
                          onChange={(e) => setNoteChange(e.target.value)}
                          className="w-full border-2 border-blue-500 p-2"
                        />
                        <div className="w-full flex justify-center">
                          <button
                            onClick={sendNote}
                            className="bg-blue-500 rounded-md mt-1 px-2 text-white"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </ClickAwayListener>
                  )}
                </div>

                {/* <div className="flex gap-3">
                <img src={tagIcon} />
                <p>Add a tag</p>
                <PlusCircle />
              </div> */}
                <div>
                  <p className="font-semibold">Assigned to:</p>
                  <div className=" cursor-pointer items-center flex gap-3 ">
                    <img src={user} />
                    <select
                      value={selectUser}
                      onChange={handleSelectUser}
                      className="w-2/4 rounded-md"
                    >
                      {teammates?.team?.map((mate, idx) => (
                        <option
                          key={idx}
                          value={mate.user.id}
                          className="cursor-pointer flex gap-3"
                        >
                          <span
                          // onMouseOver={() => selecectTeamMate(mate.user.id)}
                          >
                            {mate?.user?.name}
                          </span>
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className=" border-2 shadow-lg shadow-gray-400 m-4 p-5 mt-8">
              <div className="mb-3 text-gray-500 font-semibold flex gap-3 items-center ">
                <EyeIcon />
                Current Pages
              </div>
              <p className="text-xs my-3">
                The last page visited by the user on your website
              </p>
              {pagesVisited?.length > 0 && (
                <p className="text-xs text-[#2D80E0]">
                  {pagesVisited[0]?.page}
                </p>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  )
}
export default UsersDetails
