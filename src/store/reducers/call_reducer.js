import { createSlice } from '@reduxjs/toolkit'

export const callSlice = createSlice({
  name: 'call',
  initialState: {
    current: 'idle',
    haveMedia: false,
    video: 'off',
    audio: 'off',
    audioDevice: 'default',
    videoDevice: 'default',
    haveCreatedOffer: false,
    haveCreatedAnswer: false,
    offer: null,
    answer: null,
    myRole: null,
    callConversationId: null,
    callConversationIdList: null,
  },

  reducers: {
    setCallStatus: (state, action) => {
      state.current = action.payload
    },
    setHaveMedia: (state, action) => {
      state.haveMedia = action.payload
    },
    setVideoStatus: (state, action) => {
      state.video = action.payload
    },
    setAudioStatus: (state, action) => {
      state.audio = action.payload
    },
    setAudioDevice: (state, action) => {
      state.audioDevice = action.payload
    },
    setVideoDevice: (state, action) => {
      state.videoDevice = action.payload
    },
    setHaveCreatedOffer: (state, action) => {
      state.haveCreatedOffer = action.payload
    },
    setHaveCreatedAnswer: (state, action) => {
      state.haveCreatedAnswer = action.payload
    },
    setOffer: (state, action) => {
      state.offer = action.payload
    },
    setAnswer: (state, action) => {
      state.answer = action.payload
    },
    setMyRole: (state, action) => {
      state.myRole = action.payload
    },
    setCallConversationId: (state, action) => {
      state.callConversationId = action.payload
    },
    setCallConversationIdList: (state, action) => {
      state.callConversationIdList = action.payload
    },
  },
})

export const {
  setCallStatus,
  setHaveMedia,
  setVideoStatus,
  setAudioStatus,
  setAudioDevice,
  setVideoDevice,
  setHaveCreatedOffer,
  setHaveCreatedAnswer,
  setOffer,
  setAnswer,
  setMyRole,
  setCallConversationId,
  setCallConversationIdList,
} = callSlice.actions

export default callSlice.reducer
