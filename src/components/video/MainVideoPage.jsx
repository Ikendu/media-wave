import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import proSocketListeners from '../../webRTCUtilities/proSocketListeners'
import socketConnection from '../../webRTCUtilities/socketConnection'

const MainVideoPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [apptInfo, setApptInfo] = useState()
  const callConversationIdList = useSelector(
    (state) => state.call.callConversationIdList
  )
  const offerData = useSelector((state) => state.stream.offerData)

  const joinCall = () => {
    navigate(`/dashboard/join-meeting?token=${offerData?.uuid}`)
    // window.location.reload()
  }

  useEffect(() => {
    const socket = socketConnection(callConversationIdList)
    socket.emit('add_user_event', callConversationIdList)
    proSocketListeners.proDashboardSocketListeners(socket, dispatch)
  }, [dispatch, callConversationIdList])

  console.log('apptInfo', offerData)

  return (
    <>
      {offerData && (
        <div className="z-20 absolute top-5 right-5 bg-white h-max w-[15rem] py-4 rounded-md overflow-hidden flex justify-center items-center shadow-md">
          <>
            <div className="ml-5 mt-3">
              {offerData ? (
                <div className="flex justify-center items-center flex-col gap-2">
                  <div className="waiting-text d-inline-block">
                    {offerData?.uuid} is calling
                  </div>
                  <button
                    onClick={() => joinCall()}
                    className="bg-[#1F1F1F] px-4 py-2 rounded-md font-semibold text-white text-sm"
                  >
                    Answer
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        </div>
      )}
    </>
  )
}

export default MainVideoPage
