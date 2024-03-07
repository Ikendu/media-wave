import { useEffect, useState } from 'react'
import {
  CallsIcon,
  ChatIcon,
  DotvertIcon,
  MessageIcon,
  SenderIcon,
  VideoIcon,
} from '../../assets/IconMessage'
import smileIcon from './Icons/smile.svg'
import UploadIcon from './Icons/upload.svg'
import videoIcon from './Icons/video.svg'
import UsersDetails from './UsersDetails'
import VideoCallPage from './VideoCallPage'
import VoiceCallPage from './VoiceCallPage'
import { admin, messages } from './data'

const UserChats = ({ current, details }) => {
  const [input, setInput] = useState({})

  const [userMesg, setUserMesg] = useState(messages)
  const [openCall, setOpenCall] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)

  useEffect(() => {
    console.log(messages)
  }, [])

  const handleChange = (e) => {
    let id = current[0]?.id
    let name = current[0]?.name
    let time = Date.now()
    let email = current[0]?.email
    setInput({
      ...input,
      id,
      name,
      time,
      email,
      [e.target.name]: e.target.value,
    })
    //console.log(input)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserMesg([...messages, input])
    console.log(userMesg)
  }

  return (
    <div>
      {openCall && (
        <div className="w-full">
          <VoiceCallPage setOpenCall={setOpenCall} />
        </div>
      )}
      {openVideo && (
        <div className="w-full">
          <VideoCallPage setOpenVideo={setOpenVideo} />
        </div>
      )}
      {!openCall && !openVideo && (
        <div className="flex gap-2 ">
          <div className="bg-white p-10 relative border-2 shadow-lg overflow-scroll h-[90vh] mt-20 no-scrollbar">
            <h3>Messages</h3>
            <div className="flex gap-2 absolute right-10 cursor-pointer">
              <div
                className="p-2 rounded-full bg-slate-200 text-gray-600"
                onClick={() => setOpenCall(true)}
              >
                <CallsIcon />
              </div>
              <div
                className="p-2 rounded-full bg-slate-200 text-gray-600"
                onClick={() => setOpenVideo(true)}
              >
                <VideoIcon />
              </div>
              <div className="p-2 rounded-full bg-slate-200 text-gray-600">
                <DotvertIcon />
              </div>
            </div>

            <div className="mt-10 text-gray-600 flex gap-4 items-center py-10">
              <div className="border-b w-[250px] m-4 "></div>
              {`January 23, 2024`}
            </div>
            <div>
              {current.map((user, idx) => (
                <div key={idx} className="p-2 w-full">
                  <div className="bg-[#f1f1f7] p-3 rounded-md w-full flex gap-4">
                    <div>
                      <div className="h-10 w-10 bg-[#f3d0c6] rounded-full relative">
                        <div className="h-3 w-3 bg-[#2CC84A] rounded-full absolute border-2 border-white right-0 bottom-0"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center ">
                        <div className="font-semibold text-gray-500">
                          {user?.name}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {user?.time}
                        </div>
                      </div>
                      <div className="thin text-gray-500">{user?.mesg}</div>
                    </div>
                  </div>
                  <div>
                    {admin[idx]?.name && (
                      <div className=" p-3 rounded-md w-full flex gap-4">
                        <div>
                          <div className="h-10 w-10 bg-[#d5d4f5] rounded-full relative"></div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center ">
                            <div className="font-semibold text-gray-500">
                              {admin[idx]?.name}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {admin[idx]?.time}
                            </div>
                          </div>
                          <div className="thin text-gray-500">
                            {admin[idx]?.mesg}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border rounded-xl p-4 w-full px-10 text-gray-500 ">
              <div className="flex gap-4 items-center cursor-pointer">
                <div className="flex gap-1 items-center text-xs">
                  <ChatIcon /> Chat
                </div>
                <div className="flex gap-1 items-center text-xs">
                  <MessageIcon /> Email
                </div>
              </div>
              <form>
                <textarea
                  value={input.mesg}
                  name="mesg"
                  onChange={handleChange}
                  type="text"
                  placeholder="Type a message..."
                  className="w-full py-10 outline-none"
                />

                <div className="flex gap-4 relative">
                  <img src={UploadIcon} className="cursor-pointer" />
                  <img src={smileIcon} className="cursor-pointer" />
                  <div className="border-l pl-4 ">
                    <img src={videoIcon} className="cursor-pointer" />
                  </div>
                  <div
                    className="absolute right-0 cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <SenderIcon />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <UsersDetails details={details} />
        </div>
      )}
    </div>
  )
}

export default UserChats
