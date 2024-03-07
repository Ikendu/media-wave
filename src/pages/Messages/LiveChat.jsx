import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { DotIcon, DotvertIcon, SenderIcon } from '../../assets/IconMessage'
import Open from '../../components/dashboard/inbox/Open'
import Pending from '../../components/dashboard/inbox/Pending'
import Solved from '../../components/dashboard/inbox/Solved'
import SearchsIcon from '../../components/utils/icons/SearchsIcon'
import { setCallConversationIdList } from '../../store/reducers/call_reducer'
import socketConnection from '../../utilities/socketConnection'
import smile_icon from './Icons/smile.svg'
import upload_icon from './Icons/upload.svg'
import MessageStatus from './MessageStatus'
import UsersDetails from './UsersDetails'

const LiveChat = () => {
  const selectedCompany = useSelector(
    (state) => state.dashboard.selectedCompany
  )
  console.log(selectedCompany)
  const isActivePage = useSelector((state) => state.dashboard.activeItem)
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState('')
  const [selectedUsers, setSelectedUser] = useState('')

  const { data: inboxUsers, isLoading: usersLoading } = useSWR(
    `conversations/${isActivePage?.toLowerCase()}/${selectedCompany}/`
  )
  console.log(inboxUsers)
  const { data: conversation, isLoading: conversationLoading } = useSWR(
    `/conversations/messages/${conversationId}/`
  )

  const handleChatItemClick = (id) => {
    setConversationId(id)
    const selectedUser = inboxUsers?.find((user) => user?.id === id)
    console.log('selected user ==> ', selectedUser)

    setSelectedUser(selectedUser)
  }

  async function Accept() {
    setLoading(true)
    const data = {
      company_id: selectedCompany,
      conversation_id: conversationId,
    }
    axios
      .post(`/conversations/accept/${selectedCompany}/${conversationId}/`, data)
      .then(() => {
        setLoading(false)
        toast.success('Conversation accepted', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
      })
      .catch(() => {
        setLoading(false)
      })
      .finally(() => {})
  }
  async function onClickOpen(status) {
    setLoading(true)
    axios
      .put(
        `/conversations/update-status/${selectedCompany}/${conversationId}/`,
        { status: status }
      )
      .then(() => {
        setLoading(false)
        toast.success('Conversation opened', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
      })
      .catch(() => {
        setLoading(false)
      })
      .finally(() => {})
  }

  return (
    <div className="flex h-screen gap-3 ">
      <MessageBar
        onSelectUser={handleChatItemClick}
        data={inboxUsers}
        userLoading={usersLoading}
      />

      <ConversationPage
        onAccept={Accept}
        onClickOpen={onClickOpen}
        loading={loading}
        data={conversation}
        activePage={isActivePage}
        users={selectedUsers}
        conversationId={conversationId}
        conversationLoading={conversationLoading}
      />
    </div>
  )
}

const MessageBar = ({ onSelectUser, data, userLoading }) => {
  const isActivePage = useSelector((state) => state.dashboard.activeItem)

  function getInitials(name) {
    // Check if name is provided
    if (!name || typeof name !== 'string') {
      return 'Andro Chat' // Default value if name is not available
    }

    // Extract initials from the name
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()

    return initials || 'Andro Chat' // Return initials or default value if unable to get initials
  }

  console.log(data)
  return (
    <div className="px-2 bg-[#7A799B1C] overflow-auto custom-scrollbar h-[90vh] mt-20">
      <div className="mt-8 justify-center relative">
        <SearchsIcon />
        <input
          type="text"
          placeholder="Search"
          className="p-3 pl-14 rounded w-full text-[#7A799B]"
        />
      </div>
      <div className="text-[#7A799B] py-2">{isActivePage}</div>
      {userLoading ? (
        <div className="flex justify-center ">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="h-[600px] -mt-4">
          {data?.map((user) => (
            <div
              key={user.id}
              className="p-4 border border-t-white bg-[#FFFFFF] my-5 rounded text-[#7A799B] relative flex gap-3 cursor-pointer"
              onClick={() => onSelectUser(user?.id)}
            >
              <div className="w-10 h-10 bg-slate-400 rounded-full relative flex justify-center items-center text-2xl font-bold text-white">
                <p>{getInitials(user?.customer?.name)}</p>
                <div className="w-2 h-2 bg-green-500 rounded-full border-2 b absolute right-0 bottom-0"></div>
              </div>
              <div>
                <div className="absolute right-0 top-0 p-1">
                  <DotIcon />
                </div>
                <h3 className="font-semibold capitalize mt-2 -ml-1">
                  {user?.customer?.name}
                </h3>
                {/* <p className="text-sm">{user?.mesg}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ConversationPage = ({
  users,
  onAccept,
  onClickOpen,
  data,
  conversationId,
  loading,
  conversationLoading,
}) => {
  const selectedCompany = useSelector(
    (state) => state.dashboard.selectedCompany
  )
  const [rejectLoading, setRejectLoading] = useState(false)
  const activePage = useSelector((state) => state.dashboard.activeItem)

  async function reject() {
    setRejectLoading(true)

    const data = {
      company_id: selectedCompany,
      conversation_id: conversationId,
    }
    axios
      .post(`/conversations/reject/${selectedCompany}/${conversationId}/`, data)
      .then(() => {
        setRejectLoading(false)
        toast.success('Conversation rejected', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
      })
      .catch(() => {
        setRejectLoading(false)
      })
  }

  return (
    <>
      {activePage === 'Pending' ? (
        <>
          {users?.length === 0 ? (
            <Pending />
          ) : (
            <MessageStatus
              data={data}
              user={users}
              loading={loading}
              onAccept={onAccept}
              activePage={activePage}
              rejectLoading={rejectLoading}
              reject={reject}
            />
          )}
        </>
      ) : null}
      {activePage === 'Open' ? (
        <>
          {users?.length === 0 ? (
            <Open />
          ) : (
            <UserChats
              data={data}
              users={users}
              loading={loading}
              onAccept={onAccept}
              rejectLoading={rejectLoading}
              reject={reject}
              conversationId={conversationId}
              conversationLoading={conversationLoading}
            />
          )}
        </>
      ) : null}
      {activePage === 'Solved' ? (
        <>
          {users?.length === 0 ? (
            <Solved />
          ) : (
            <MessageStatus
              data={data}
              user={users}
              loading={loading}
              onAccept={onAccept}
              onClickOpen={onClickOpen}
              activePage={activePage}
              rejectLoading={rejectLoading}
              reject={reject}
            />
          )}
        </>
      ) : null}
    </>
  )
}

const UserChats = ({
  data: conversation,
  conversationId,
  users,
  conversationLoading,
}) => {
  const [socket, setSocket] = useState(null)
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const dispatch = useDispatch()

  const selectedCompany = useSelector(
    (state) => state.dashboard.selectedCompany
  )
  const selectedComp = useSelector((state) => state.auth?.selectedComp)
  console.log(selectedCompany)
  const { data: conversationsList } = useSWR(
    `/conversations/${selectedCompany}/`
  )
  const ids = conversationsList && conversationsList?.map((item) => item?.id)
  dispatch(setCallConversationIdList(ids))
  const typingTimeoutRef = useRef(null)
  const doneTypingInterval = 2000 // Adjust the interval as needed
  const showNotification = useCallback(() => {
    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.')
      return
    }

    // Check if the user has granted permission for notifications
    if (Notification.permission === 'granted') {
      const notification = new Notification('New Message', {
        body: 'You have a new message!',
      })

      // You can handle clicks on the notification if needed
      notification.onclick = () => {
        // Handle the click event (e.g., focus on the chat window)
        console.log('Notification clicked')
      }
    } else if (Notification.permission !== 'denied') {
      // If the user hasn't granted or denied permission, request it
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification()
        }
      })
    }
  }, [])

  const handleChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
    handleTyping(inputValue)
  }
  async function onClickSolve(status) {
    setLoading(true)
    axios
      .put(
        `/conversations/update-status/${selectedCompany}/${conversationId}/`,
        { status: status }
      )
      .then(() => {
        setLoading(false)
        toast.success('Conversation solved', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        })
        navigate('/dashboard/inbox/solved')
      })
      .catch(() => {
        setLoading(false)
      })
      .finally(() => {})
  }
  useEffect(() => {
    return () => {
      // Clean up the timer when the component unmounts or input changes
      clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const newSocket = socketConnection()
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const playAudio = () => {
    const audio = new Audio(
      'https://res.cloudinary.com/dj3zrsni6/video/upload/v1707355244/17571_download_iphone_notification_ringtone_iphone_sms_ringtones_kbnksn.mp3'
    )
    audio.play()
  }
  // const handleGetMessage = (data) => {
  //   if (data?.customer) {
  //     showNotification()
  //     playAudio()
  //   }
  //   setMessages((prevMessages) => [...prevMessages, data])
  // }
  const handleTypingMessage = useCallback((data) => {
    if (data?.data?.typing === true || data?.data?.customer === 'yes') {
      setTyping(data?.data)
    }
  }, [])

  const handleGetMessage = useCallback(
    (data) => {
      if (data?.customer) {
        showNotification()
        playAudio()
      }
      setMessages((prevMessages) => [...prevMessages, data])
    },
    [showNotification]
  )

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        if (ids) {
          socket.emit('add_user_event', ids)
        }
      })
    }
  })

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connected')

        socket.on('getMessage', handleGetMessage)

        socket.on('onTyping', handleTypingMessage)

        socket.on('messageReveal', (data) => {
          console.log('Message from messageReveal:', data)
        })
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })
    }
  }, [socket, handleGetMessage, handleTypingMessage])

  const handleTyping = () => {
    clearTimeout(typingTimeoutRef.current)

    typingTimeoutRef.current = setTimeout(() => {
      const messageStatus = {
        conversation: conversationId,
        customer: 'yes',
        typing: false,
      }
      socket && socket.emit('istyping_event', messageStatus)
    }, doneTypingInterval)

    const messageStatus = {
      conversation: conversationId,
      user: 'yes',
      typing: true,
    }
    socket && socket.emit('istyping_event', messageStatus)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const messageData = {
      conversation: conversationId,
      message: value,
      user: 'true',
    }

    socket.emit('send_message', messageData)
    socket.emit('istyping_event', {
      conversation: conversationId,
      user: 'yes',
      typing: false,
    })
    setValue('')
    const messageD = {
      conversation: conversationId,
      message: value,
      read: false,
    }
    axios
      .post('conversations/messages/create/user/', messageD)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (conversation) {
      setMessages([...conversation])
    }
  }, [conversation])
  function getInitials(name) {
    // Check if name is provided
    if (!name || typeof name !== 'string') {
      return 'Andro Chat' // Default value if name is not available
    }

    // Extract initials from the name
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()

    return initials || 'Andro Chat' // Return initials or default value if unable to get initials
  }

  return (
    <div className="grid grid-cols-3 w-full">
      <div className="bg-white relative col-span-2 mt-20 flex flex-col overflow-y-hidden">
        <div className="pb-[2rem]">
          <div className="flex justify-between items-center pr-2">
            <h3>Messages</h3>
            <div className="flex gap-2">
              {/* <div className="p-2 rounded-full bg-slate-200 text-gray-600">
            <CallsIcon />
          </div>
          <div className="p-2 rounded-full bg-slate-200 text-gray-600">
            <VideoIcon />
          </div> */}
              <div className="px-3 py-1 rounded-full flex justify-center items-center bg-slate-200 text-gray-600">
                <DotvertIcon />
              </div>
              <button
                onClick={() => onClickSolve('solved')}
                className="py-2 px-4 rounded-full bg-slate-200 text-gray-600 text-sm"
              >
                {loading ? (
                  <>
                    <CircularProgress
                      color="secondary"
                      thickness={10}
                      size={18}
                    />
                  </>
                ) : (
                  'Solved'
                )}
              </button>
            </div>
          </div>
          {/* <div className="mt-5 text-gray-600 flex gap-4 items-center py-3">
            <div className="border-b w-[250px] m-4"></div>
            {`January 23, 2024`}
          </div> */}
        </div>

        <div className="flex-1 pt-[2rem] overflow-hidden">
          <ScrollToBottom
            className="chat-container custom-scrollbar"
            initialScrollBehavior="smooth"
          >
            <div className="flex flex-col gap-3">
              {conversationLoading ? (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {messages?.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 mr-3 rounded-lg ${
                        msg.customer ? ' ' : ' bg-[#605BFF]/20'
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        {!msg?.customer ? (
                          <div className="h-14 w-14 rounded-[50%] flex justify-center items-center  bg-[#605BFF]/20">
                            {getInitials(selectedComp?.name)}
                          </div>
                        ) : (
                          <div className=" h-14 w-14 flex justify-center items-center rounded-[50%] bg-[#FF8F6B]/20">
                            {getInitials(msg?.customer)}{' '}
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <span className="font-bold text-[#7A799B]">
                            {!msg?.customer
                              ? selectedComp?.name
                              : msg?.customer}
                          </span>
                          <span>{msg?.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {typing?.typing && typing?.customer && (
                    <span className="text-[#7A799B] p-3 rounded-lg bg-[#FF8F6B]/20">
                      {typing?.value && <>{typing.value}</>}
                    </span>
                  )}
                </>
              )}
            </div>
          </ScrollToBottom>
        </div>

        <div className="border rounded-xl px-4 py-2 w-[98%] text-gray-500 absolute bottom-2 bg-inherit">
          {/* <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center text-xs">
              <ColoredChatIcon /> Chat
            </div>
            <div className="flex gap-1 items-center text-xs">
              <MessageIcon /> Email
            </div>
          </div> */}
          <textarea
            type="text"
            value={value}
            onChange={handleChange} // Call handleChange on input change
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full outline-none text-sm mt-2"
          />
          <div className="flex gap-2 items-center relative">
            <img src={upload_icon} />
            <img src={smile_icon} />

            <div className="absolute right-0" onClick={handleSubmit}>
              <SenderIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <UsersDetails details={users} />
      </div>
    </div>
  )
}

export default LiveChat
