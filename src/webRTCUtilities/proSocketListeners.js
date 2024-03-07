import {
  setCallConversationId,
  setMyRole,
  setOffer,
} from '../store/reducers/call_reducer'
import { setOfferData } from '../store/reducers/stream_reducer'

const proDashboardSocketListeners = (socket, dispatch) => {
  console.log('-0-0000000000000000000000')
  socket.on('apptData', (apptData) => {
    console.log(apptData, '-0-0000000000000000000000')
    dispatch(setCallConversationId(apptData))
  })

  socket.on('newOfferWaiting', (offerData) => {
    // setApptInfo(offerData)
    dispatch(setOfferData(offerData))
    dispatch(setOffer(offerData?.offer))
    dispatch(setMyRole('answerer'))
  })
}

const proVideoSocketListeners = (socket, addIceCandidateToPc) => {
  // console.log("ICE CANDIDATE")
  socket.on('iceToClient', (iceC) => {
    console.log('ICE CANDIDATE', iceC)
    addIceCandidateToPc(iceC)
  })
}

export default { proDashboardSocketListeners, proVideoSocketListeners }
