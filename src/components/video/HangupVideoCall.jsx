import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import call_hangup from '../../pages/Messages/Icons/call.svg'
import {
  setAnswer,
  setAudioStatus,
  setCallStatus,
  setHaveCreatedAnswer,
  setHaveMedia,
  setOffer,
  setVideoStatus,
} from '../../store/reducers/call_reducer'
import {
  setLocalStream,
  setRemoteStream,
} from '../../store/reducers/stream_reducer'
import socketConnection from '../../webRTCUtilities/socketConnection'

const HangupVideoCall = ({ smallFeedEl, largeFeedEl }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const remoteStream = useSelector((state) => state.stream.remoteStream)
  const callConversationIdList = useSelector(
    (state) => state.call.callConversationIdList
  )
  const callConversationId = useSelector(
    (state) => state.call.callConversationId
  )

  const hangupCall = () => {
    dispatch(setCallStatus('complete'))
    dispatch(setHaveMedia(false))
    dispatch(setVideoStatus('off'))
    dispatch(setAudioStatus('off'))
    dispatch(setOffer(null))
    dispatch(setAnswer(null))
    dispatch(setHaveCreatedAnswer(false))
    if (remoteStream?.peerConnection) {
      remoteStream?.peerConnection?.close()
    }

    // setOpenVideo(false)
    if (smallFeedEl.current.srcObject) {
      smallFeedEl.current.srcObject = null
    }

    if (largeFeedEl.current.srcObject) {
      largeFeedEl.current.srcObject = null
    }
    dispatch(setRemoteStream(null))
    dispatch(setLocalStream(null))

    const socket = socketConnection(callConversationIdList)
    socket.emit('hangup', {
      uuid: callConversationId,
    })
    navigate('/dashboard/inbox/open')
    window.location.reload()

    console.log('stream', remoteStream)
  }

  return (
    <div onClick={hangupCall}>
      <img src={call_hangup} />
    </div>
  )
}

export default HangupVideoCall
