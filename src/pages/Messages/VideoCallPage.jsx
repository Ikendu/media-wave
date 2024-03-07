import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import getDevices from '../../components/video/getDevices'
import startAudioStream from '../../components/video/startAudioStream'
import startLocalVideoStream from '../../components/video/startLocalVideoStream'
import {
  setAudioStatus,
  setCallStatus,
  setHaveCreatedOffer,
  setHaveMedia,
  setVideoDevice,
  setVideoStatus,
} from '../../store/reducers/call_reducer'
import {
  setLocalStream,
  setRemoteStream,
} from '../../store/reducers/stream_reducer'
import clientSocketListeners from '../../webRTCUtilities/clientSocketListeners'
import createPeerConnection from '../../webRTCUtilities/createPeerConnection'
import socketConnection from '../../webRTCUtilities/socketConnection'
import DotVert from './Icons/DotVert.svg'
import attarch from './Icons/attarch.svg'
import call from './Icons/call.svg'
import camSlach from './Icons/camSlach.svg'
import micblack from './Icons/micblack.svg'
import microphone from './Icons/microphone.svg'
import smile2 from './Icons/smile2.svg'
import {
  default as videoCaller,
  default as videoCaller2,
} from './Icons/videoCaller.png'

const VideoCallPage = ({ setOpenVideo }) => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [apptInfo, setApptInfo] = useState()
  const [pendingUpdate, setPendingUpdate] = useState(false)
  const [videoDeviceList, setVideoDeviceList] = useState([])
  const [caretOpen, setCaretOpen] = useState(false)
  const smallFeedEl = useRef(null)
  const largeFeedEl = useRef(null)
  const uuidRef = useRef(null)
  const streamsRef = useRef(null)

  const haveMedia = useSelector((state) => state.call.haveMedia)
  const localStream = useSelector((state) => state.stream.localStream)
  const remoteStream = useSelector((state) => state.stream.remoteStream)
  const videoStatus = useSelector((state) => state.call.video)
  const audioStatus = useSelector((state) => state.call.audio)
  const audioDevice = useSelector((state) => state.call.audioDevice)
  const videoDevice = useSelector((state) => state.call.videoDevice)
  const haveCreatedOffer = useSelector((state) => state.call.haveCreatedOffer)
  const answer = useSelector((state) => state.call.answer)

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
    console.log('id', deviceId)

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
    //come back to this later
    //if we stop the old tracks, and add the new tracks, that will mean
    // ... renegotiation

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
    if (videoStatus === 'enabled') {
      dispatch(setVideoStatus('disabled'))

      const tracks = localStream?.stream.getVideoTracks()
      tracks.forEach((t) => {
        // console.log(t)
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

  const hangupCall = () => {
    dispatch(setCallStatus('complete'))
    if (remoteStream?.peerConnection) {
      remoteStream?.peerConnection?.close()
      remoteStream.peerConnection.onicecandidate = null
      remoteStream.peerConnection.onaddstream = null
      remoteStream.peerConnection = null
    }
    setOpenVideo(false)
    smallFeedEl.current.srcObject = null
    largeFeedEl.current.srcObject = null
  }

  useEffect(() => {
    if (pendingUpdate && haveMedia) {
      console.log('pending update succeeded')
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
    const addIce = (iceC) => {
      // emit a new icecandidate to the signaling server
      const socket = socketConnection(searchParams.get('token'))
      socket.emit('iceToServer', {
        iceC,
        who: 'client',
        uuid: uuidRef.current,
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
        // console.log(peerConnection)
        dispatch(
          setRemoteStream({
            streamType: 'remoteStream',
            stream: remoteStream,
            peerConnection: peerConnection,
          })
        )

        largeFeedEl.current.srcObject = remoteStream
      } catch (error) {
        console.log(error)
      }
    }

    fetchMedia()
    console.log('large video feed')
  }, [dispatch, searchParams, largeFeedEl])

  useEffect(() => {
    if (remoteStream) {
      streamsRef.current = remoteStream
    }
  }, [remoteStream])

  useEffect(() => {
    const createOfferAsync = async () => {
      try {
        const pc = remoteStream?.peerConnection
        const offer = await pc.createOffer()
        pc.setLocalDescription(offer)
        const token = searchParams.get('token')
        const socket = socketConnection(token)
        // console.log('====', socket)

        socket.emit('newOffer', { offer, apptInfo })
        // clientSocketListeners(socket, dispatch)
      } catch (err) {
        console.log(err)
      }

      dispatch(setHaveCreatedOffer(true))
    }

    if (
      audioStatus === 'enabled' &&
      videoStatus === 'enabled' &&
      !haveCreatedOffer
    ) {
      createOfferAsync()
    }

    console.log(audioStatus, videoStatus, haveCreatedOffer)
  }, [
    apptInfo,
    audioStatus,
    dispatch,
    haveCreatedOffer,
    remoteStream?.peerConnection,
    searchParams,
    videoStatus,
  ])

  useEffect(() => {
    const asyncAddAnswer = async () => {
      const pc = remoteStream?.peerConnection
      await pc.setRemoteDescription(answer)
      console.log(pc.signalingState)
      console.log('Answer added')
    }
    // listen for changes to answer
    // if there is answer, then we have an answer
    if (answer) {
      asyncAddAnswer()
    }
  }, [answer, remoteStream?.peerConnection])

  useEffect(() => {
    const token = searchParams.get('token')
    console.log(token)
    const fetchDecodedToken = async () => {
      const res = await axios.post('https://localhost:9000/validate-link', {
        token,
      })
      console.log(res.data)
      setApptInfo(res.data)
      uuidRef.current = res.data.uuid
    }
    fetchDecodedToken()
  }, [searchParams])

  useEffect(() => {
    const addIceCandidateToPc = (iceC) => {
      // add an ice candidate from the remote to the peerconnection
      const pc = streamsRef?.current?.peerConnection
      pc.addIceCandidate(iceC)
      console.log('Added an ice candidate to existing page')
    }

    const token = searchParams.get('token')
    const socket = socketConnection(token)
    clientSocketListeners(socket, dispatch, addIceCandidateToPc)
  }, [searchParams, remoteStream?.peerConnection, streamsRef, dispatch])

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

  // console.log(videoStatus)

  return (
    <div
      className="mt-20 pb-[0.5px] h-[550px] relative mr-2"
      style={{ backgroundImage: `url(${videoCaller})` }}
    >
      <video
        ref={largeFeedEl}
        autoPlay
        playsInline
        className="h-full w-full"
      ></video>
      {/* <div className="text-gray-100  p-5 m-10 text-sm ">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <p className="px-6 py-2 bg-[#24243f] rounded-lg bg-opacity-40 ">
              Evans David
            </p>
            <div className="px-6 py-2 bg-[#24243f] rounded-lg flex gap-2 items-center bg-opacity-40">
              <div className="bg-gray-300 p-2 rounded-full">
                <div className="bg-[#EB5757] p-1 rounded-full "></div>
              </div>{' '}
              <p>24:13:03</p>
            </div>
          </div>

          <div
            className="bg-[#0f0f3a] p-1 rounded-full bg-opacity-40"
            onClick={() => setOpenVideo(false)}
          >
            <img src={minimise} />
          </div>
        </div>
      </div> */}
      <div className="absolute bottom-0 w-full ">
        <div className="m-5 mt-28 flex justify-between items-center ">
          <div
            className="relative w-1/3 rounded-xl h-[12rem]"
            style={{ backgroundImage: `url(${videoCaller2})` }}
          >
            <video
              ref={smallFeedEl}
              autoPlay
              playsInline
              muted
              className="h-full w-full rounded-xl"
            ></video>
            {/* <div className="p-20"></div> */}
            <div className="absolute bottom-1 right-0 left-0 flex justify-between text-white text-sm mt-auto">
              <p className="m-2 py-1 px-4 bg-gray-800 rounded-full bg-opacity-40">
                Faith Ada
              </p>
              <div className="m-2 p-1 rounded-full bg-red-600 cursor-pointer">
                <img src={microphone} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 cursor-pointer absolute bottom-5 right-3">
            <div onClick={startStopAudio}>
              <img src={micblack} />
            </div>
            <div onClick={startStopVideo}>
              <img src={camSlach} />
            </div>
            <div className="p-2 rounded-full bg-slate-300">
              <img src={smile2} />
            </div>
            <div className="p-2 px-[15px] rounded-full bg-slate-300">
              <img src={attarch} />
            </div>
            <div className="relative">
              <img onClick={() => setCaretOpen(!caretOpen)} src={DotVert} />
              {caretOpen && <DropDown />}
            </div>
            <div>
              <img src={call} onClick={hangupCall} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VideoCallPage
