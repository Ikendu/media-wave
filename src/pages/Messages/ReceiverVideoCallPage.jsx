import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PhoneCallIcon from '../../components/utils/icons/PhoneCallIcon'
import VideoCallIcon from '../../components/utils/icons/VideoCallIcon'
import HangupVideoCall from '../../components/video/HangupVideoCall'
import getDevices from '../../components/video/getDevices'
import startAudioStream from '../../components/video/startAudioStream'
import startLocalVideoStream from '../../components/video/startLocalVideoStream'
import {
  setAnswer,
  setAudioStatus,
  setCallStatus,
  setHaveCreatedAnswer,
  setHaveMedia,
  setOffer,
  setVideoDevice,
  setVideoStatus,
} from '../../store/reducers/call_reducer'
import {
  setLocalStream,
  setOfferData,
  setRemoteStream,
} from '../../store/reducers/stream_reducer'
import createPeerConnection from '../../webRTCUtilities/createPeerConnection'
import proSocketListeners from '../../webRTCUtilities/proSocketListeners'
import socketConnection from '../../webRTCUtilities/socketConnection'
import DotVert from './Icons/DotVert.svg'
import camSlach from './Icons/camSlach.svg'
import micblack from './Icons/micblack.svg'
import microphone from './Icons/microphone.svg'
import { default as videoCaller2 } from './Icons/videoCaller.png'

const ReceiverVideoCallPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [searchParams] = useSearchParams()s
  // const [apptInfo, setApptInfo] = useState()
  const [pendingUpdate, setPendingUpdate] = useState(false)
  const [videoDeviceList, setVideoDeviceList] = useState([])
  const [caretOpen, setCaretOpen] = useState(false)
  const [haveGottenIce, setHaveGottenIce] = useState(false)
  const smallFeedEl = useRef(null)
  const largeFeedEl = useRef(null)
  const streamsRef = useRef(null)
  // console.log(apptInfo)

  const haveMedia = useSelector((state) => state.call.haveMedia)
  const localStream = useSelector((state) => state.stream.localStream)
  const remoteStream = useSelector((state) => state.stream.remoteStream)
  const videoStatus = useSelector((state) => state.call.video)
  const audioStatus = useSelector((state) => state.call.audio)
  const audioDevice = useSelector((state) => state.call.audioDevice)
  const videoDevice = useSelector((state) => state.call.videoDevice)
  const haveCreatedAnswer = useSelector((state) => state.call.haveCreatedAnswer)
  const offer = useSelector((state) => state.call.offer)
  const callConversationIdList = useSelector(
    (state) => state.call.callConversationIdList
  )
  const callConversationId = useSelector(
    (state) => state.call.callConversationId
  )

  const DropDown = () => {
    return (
      <div className="absolute bottom-12 right-0 p-2 bg-slate-600">
        <select defaultValue={videoDevice} onChange={changeVideoDevice}>
          {videoDeviceList?.map((vd) => (
            <option key={vd?.deviceId} value={vd.deviceId}>
              {vd.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const changeVideoDevice = async (e) => {
    const deviceId = e.target.value

    const newConstraints = {
      audio:
        audioDevice === 'default' ? true : { deviceId: { exact: audioDevice } },
      video: { deviceId: { exact: deviceId } },
    }
    const stream = await navigator.mediaDevices.getUserMedia(newConstraints)

    dispatch(setVideoDevice('videoDevice', deviceId))
    dispatch(setVideoStatus('video', 'enabled'))

    smallFeedEl.current.srcObject = stream
    dispatch(setLocalStream('localStream', stream))
    const [videoTrack] = stream.getVideoTracks()
    // console.log(videoTrack)

    if (remoteStream?.peerConnection) {
      //getSenders will grab all the RTCRtpSenders that the PC has
      //RTCRtpSender manages how tracks are sent via the PC
      const senders = remoteStream?.peerConnection.getSenders()
      //find the sender that is in charge of the video track
      const sender = senders.find((s) => {
        if (s.track) {
          //if this track matches the videoTrack kind, return it
          return s.track.kind === videoTrack.kind
        } else {
          return false
        }
      })
      //sender is RTCRtpSender, so it can replace the track
      sender.replaceTrack(videoTrack)
    }
  }

  const startStopVideo = () => {
    // console.log(videoStatus)
    if (videoStatus === 'enabled') {
      dispatch(setVideoStatus('disabled'))

      const tracks = localStream?.stream.getVideoTracks()
      tracks.forEach((t) => {
        console.log(t)
        t.enabled = false
      })
    } else if (videoStatus === 'disabled') {
      dispatch(setVideoStatus('enabled'))

      const tracks = localStream?.stream.getVideoTracks()
      tracks.forEach((t) => (t.enabled = true))
    } else if (haveMedia) {
      // we have the, show th feed
      smallFeedEl.current.srcObject = localStream?.stream
      startLocalVideoStream(remoteStream, localStream, dispatch)
      // dispatch(setVideoStatus('enabled'))
    } else {
      setPendingUpdate(true)
    }
  }

  const startStopAudio = () => {
    if (audioStatus === 'enabled') {
      dispatch(setAudioStatus('disabled'))

      const tracks = localStream?.stream.getAudioTracks()
      tracks.forEach((t) => {
        // console.log(t)
        t.enabled = false
      })
    } else if (audioStatus === 'disabled') {
      dispatch(setAudioStatus('enabled'))

      const tracks = localStream?.stream.getAudioTracks()
      tracks.forEach((t) => (t.enabled = true))
    } else {
      startAudioStream(remoteStream, localStream)
      dispatch(setAudioStatus('enabled'))
    }
  }

  const answerCall = () => {
    startStopVideo()
    startStopAudio()
  }

  useEffect(() => {
    if (pendingUpdate && haveMedia) {
      // console.log('pending update succeeded')
      setPendingUpdate(false)
      smallFeedEl.current.srcObject = localStream?.stream
      startLocalVideoStream(remoteStream, localStream, dispatch)
    }
  }, [
    pendingUpdate,
    haveMedia,
    smallFeedEl,
    localStream?.stream,
    dispatch,
    remoteStream,
    localStream,
  ])

  useEffect(() => {
    const addIceCandidateToPc = (iceC) => {
      // add an ice candidate from the remote to the peerconnection
      const pc = streamsRef?.current?.peerConnection
      pc.addIceCandidate(iceC)
      // console.log('Added an ice candidate to existing page')
    }

    const socket = socketConnection(callConversationIdList)
    socket.on('iceToClient', (iceC) => {
      // console.log("ICE CANDIDATE", iceC)
      addIceCandidateToPc(iceC)
    })
    proSocketListeners.proVideoSocketListeners(socket, addIceCandidateToPc)
  }, [remoteStream?.peerConnection, callConversationIdList])

  useEffect(() => {
    const addIce = (iceC) => {
      // emit a new ice candidate to the signaling server
      const socket = socketConnection(callConversationIdList)
      socket.emit('iceToServer', {
        iceC,
        who: 'professional',
        uuid: callConversationId,
      })
    }

    const fetchMedia = async () => {
      const constraints = {
        video: true,
        audio: true,
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        dispatch(setHaveMedia(true))
        // saves this
        dispatch(setLocalStream({ streamType: 'localStream', stream: stream }))
        const { peerConnection, remoteStream } =
          await createPeerConnection(addIce)
        dispatch(
          setRemoteStream({
            streamType: 'remoteStream',
            stream: remoteStream,
            peerConnection: peerConnection,
          })
        )
        // console.log(peerConnection)

        console.log(remoteStream)
        largeFeedEl.current.srcObject = remoteStream
        console.log(largeFeedEl)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMedia()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, largeFeedEl])

  useEffect(() => {
    const getIceAsync = async () => {
      const socket = socketConnection(callConversationIdList)
      const uuid = callConversationId
      const iceCandidates = await socket.emitWithAck(
        'getIce',
        uuid,
        'professional'
      )

      // console.log("ice candidate found", iceCandidates)
      iceCandidates?.forEach((iceC) => {
        const pc = remoteStream?.peerConnection
        pc.addIceCandidate(iceC)
      })
    }

    if (remoteStream && !haveGottenIce) {
      setHaveGottenIce(true)
      getIceAsync()
      streamsRef.current = remoteStream
    }
  }, [remoteStream, haveGottenIce, callConversationIdList, callConversationId])

  useEffect(() => {
    const setAsyncOffer = async () => {
      // console.log('setting remote description')
      const pc = remoteStream?.peerConnection
      await pc.setRemoteDescription(offer)
      console.log('setting remote description', pc)
    }

    if (
      offer &&
      remoteStream?.streamType === 'remoteStream' &&
      remoteStream?.peerConnection
    ) {
      // console.log(offer, remoteStream)
      setAsyncOffer()
    }
  }, [offer, remoteStream])

  useEffect(() => {
    const createAnswerAsync = async () => {
      const pc = remoteStream?.peerConnection
      //   console.log(remoteStream?.peerConnection)
      const answer = await pc.createAnswer({})
      await pc.setLocalDescription(answer)
      console.log(pc.signalingState)

      dispatch(setHaveCreatedAnswer(true))
      dispatch(setAnswer(answer))
      dispatch(setOfferData(null))

      // emit the answer to the server
      const uuid = callConversationId
      const socket = socketConnection(callConversationIdList)
      socket.emit('newAnswer', { answer, uuid })
    }

    if (
      audioStatus === 'enabled' &&
      videoStatus === 'enabled' &&
      !haveCreatedAnswer
    ) {
      createAnswerAsync()
    }
  }, [
    audioStatus,
    videoStatus,
    haveCreatedAnswer,
    remoteStream?.peerConnection,
    callConversationIdList,
    callConversationId,
    dispatch,
  ])

  useEffect(() => {
    const socket = socketConnection(callConversationIdList)
    socket.on('hangUp', (uuid) => {
      if (uuid === callConversationId) {
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

        navigate('/dashboard/inbox/open')
        window.location.reload()

        // // Disable camera and audio permissions
        // navigator.mediaDevices
        //   .getUserMedia({ video: false, audio: false })
        //   .then(function () {
        //     // Do something if permissions are successfully disabled
        //     console.log('Camera and audio permissions disabled')
        //   })
        //   .catch(function (err) {
        //     // Handle errors if permissions cannot be disabled
        //     console.error('Error disabling camera and audio permissions:', err)
        //   })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteStream?.peerConnection])

  useEffect(() => {
    const getDevicesAsync = async () => {
      if (caretOpen) {
        const devices = await getDevices()
        // console.log(devices.videoDevices)
        setVideoDeviceList(devices.videoDevices)
      }
    }
    getDevicesAsync()
  }, [caretOpen])

  console.log(haveCreatedAnswer, audioStatus, videoStatus)

  return (
    <div className="mt-20 pb-[0.5px] h-[550px] relative mr-2 bg-[#040D42] rounded-lg flex flex-col ">
      <video
        ref={largeFeedEl}
        autoPlay
        playsInline
        className="h-full w-full z-20"
      ></video>

      {offer && !haveCreatedAnswer && (
        <div
          onClick={answerCall}
          className="m-auto z-20 cursor-pointer absolute top-[35%] bottom-[50%] right-[50%] left-[45%]"
        >
          <PhoneCallIcon />
          <p className="text-white font-medium text-lg min-w-max text-center ml-5">
            Join call
          </p>
        </div>
      )}

      {offer && haveCreatedAnswer && (
        <div className="m-auto absolute top-[40%] bottom-[50%] right-[50%] left-[45%]">
          <p className="text-white font-medium text-xl">Connecting...</p>
        </div>
      )}

      <div className="absolute bottom-0 w-full">
        <div className="m-5 mt-28 flex justify-between items-center ">
          {/* <div
            className="relative w-1/3 rounded-xl h-[12rem] z-40"
            style={{ backgroundImage: `url(${videoCaller2})` }}
          > */}
          <video
            ref={smallFeedEl}
            autoPlay
            playsInline
            muted
            className="w-1/3 lg:w-[14rem] rounded-xl h-[12rem] z-40"
            style={{ backgroundImage: `url(${videoCaller2})` }}
          ></video>
          {/* </div> */}
          {offer && haveCreatedAnswer && (
            <div className="flex gap-2 cursor-pointer absolute bottom-5 right-3 z-40">
              {audioStatus === 'disabled' && (
                <div
                  onClick={startStopAudio}
                  className="p-2 rounded-full bg-[#FF0051] cursor-pointer"
                >
                  <img src={microphone} />
                </div>
              )}

              {audioStatus === 'enabled' && (
                <div onClick={startStopAudio}>
                  <img src={micblack} />
                </div>
              )}

              {videoStatus === 'disabled' && (
                <div onClick={startStopVideo}>
                  <img src={camSlach} />
                </div>
              )}

              {videoStatus === 'enabled' && (
                <div onClick={startStopVideo}>
                  <VideoCallIcon />
                </div>
              )}

              {/* <div className="p-2 rounded-full bg-slate-300">
                <img src={smile2} />
              </div>
              <div className="p-2 px-[15px] rounded-full bg-slate-300">
                <img src={attarch} />
              </div>
              <div className="m-2 p-1 rounded-full bg-red-600 cursor-pointer">
                <img src={microphone} />
              </div> */}
              <div className="relative">
                <img onClick={() => setCaretOpen(!caretOpen)} src={DotVert} />
                {caretOpen && <DropDown />}
              </div>
              {/* <div>
              <img src={call} onClick={() => setOpenVideo(false)} />
            </div> */}
              <HangupVideoCall
                smallFeedEl={smallFeedEl}
                largeFeedEl={largeFeedEl}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ReceiverVideoCallPage
