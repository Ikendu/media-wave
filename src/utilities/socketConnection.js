import { io } from 'socket.io-client'

const socketConnection = () => {
  return io.connect('https://api.andromedia.cc', { transports: ['websocket'] })
}

export default socketConnection

// const socket = io('http://127.0.0.1:8000/', options={transports:["websocket"],})
