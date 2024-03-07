//this functions job is to update all peerConnections (addTracks) and update redux callStatus
import { setVideoStatus } from '../../store/reducers/call_reducer'

const startLocalVideoStream = (remoteStream, localStream, dispatch) => {
  // const localStream = remoteStream
  // console.log(localStream)

  //s is the key
  if (remoteStream?.streamType !== 'localStream') {
    //we don't addTracks to the localStream

    //addTracks to all peerConnecions
    localStream.stream.getVideoTracks().forEach((t) => {
      remoteStream?.peerConnection.addTrack(t, localStream?.stream)
    })
    //update redux callStatus
    dispatch(setVideoStatus('enabled'))
  }
}

export default startLocalVideoStream
