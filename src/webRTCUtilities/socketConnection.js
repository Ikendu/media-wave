import { io } from 'socket.io-client'

// const socketConnection = io.connect('https://localhost:9000')
let socket
const socketConnection = (callConversationIdList) => {
  if (socket && socket.connected) {
    return socket
  } else {
    socket = io.connect('https://api.andromedia.cc', {
      transports: ['websocket'],
    })
    socket.on('connect', () => {
      console.log('connected -')
      socket.emit('add_user_event', callConversationIdList)

      // setApptInfo(apptData)
    })

    return socket
  }
}

export default socketConnection
