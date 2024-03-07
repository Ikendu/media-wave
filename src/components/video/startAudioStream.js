//this functions job is to update all peerConnections (addTracks) and update redux callStatus

const startAudioStream = (remoteStream, localStream) => {
  // const localStream = remoteStream
  console.log(localStream)

  //s is the key
  if (remoteStream?.streamType !== 'localStream') {
    //we don't addTracks to the localStream

    //addTracks to all peerConnecions
    localStream.stream.getAudioTracks().forEach((t) => {
      remoteStream.peerConnection.addTrack(t, localStream?.stream)
    })
    //update redux callStatus
  }
}

export default startAudioStream
