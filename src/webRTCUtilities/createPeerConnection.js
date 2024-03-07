import peerConfiguration from './stunServers'

/* eslint-disable no-async-promise-executor */
const createPeerConnection = (addIce) => {
  return new Promise(async (resolve, reject) => {
    try {
      const peerConnection = await new RTCPeerConnection(peerConfiguration)
      const remoteStream = new MediaStream()
      peerConnection.addEventListener('signalingstatechange', (e) => {
        // console.log('Signaling State Change')
        console.log(e)
      })

      peerConnection.addEventListener('icecandidate', (e) => {
        // console.log('Found ice candidate...')
        if (e.candidate) {
          // emit to socket server
          addIce(e.candidate)
        }
      })

      peerConnection.addEventListener('track', (e) => {
        console.log(e.streams)
        e.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track, remoteStream)
          console.log('Fingers crossed...')
        })
      })

      resolve({
        peerConnection,
        remoteStream,
      })
    } catch (error) {
      console.log(error)
      reject()
    }
  })
}

export default createPeerConnection
