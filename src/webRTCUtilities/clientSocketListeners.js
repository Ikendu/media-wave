import { setAnswer, setMyRole } from '../store/reducers/call_reducer'

const clientSocketListeners = (socket, dispatch, addIceCandidateToPc) => {
  socket.on('answerToClient', (answer) => {
    console.log('answer', answer)
    dispatch(setAnswer(answer))
    dispatch(setMyRole('offerer'))
  })

  socket.on('iceToClient', (iceC) => {
    console.log(typeof addIceCandidateToPc)
    console.log(iceC, "-=-87654635476980-==========================");
    addIceCandidateToPc(iceC)
  })
}

export default clientSocketListeners
