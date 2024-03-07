import { createSlice } from '@reduxjs/toolkit'
import { addNewItems } from '../../constants/auth_actions'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatStep: 0,
    chatScriptOption: 'JavaScript',
    setupData: {},
    setupImage: null,
    setupImageUrl: null,
    settingsImageUrl: null,
    newSetupCompany: null,
    countries: null,
  },

  reducers: {
    setChatStep: (state, action) => {
      state.chatStep = action.payload
    },
    setChatScriptOption: (state, action) => {
      state.chatScriptOption = action.payload
    },
    setSetupData: (state, action) => {
      const newData = addNewItems(state.setupData, action.payload)
      state.setupData = newData
    },
    resetSetupData: (state, action) => {
      state.setupData = action.payload
    },
    setSetupImage: (state, action) => {
      state.setupImage = action.payload
    },
    setSetupImageUrl: (state, action) => {
      state.setupImageUrl = action.payload
    },
    setSettingsImageUrl: (state, action) => {
      state.settingsImageUrl = action.payload
    },
    setNewSetupCompany: (state, action) => {
      state.newSetupCompany = action.payload
    },
    setCountries: (state, action) => {
      state.countries = action.payload
    },
  },
})

export const {
  setChatStep,
  setChatScriptOption,
  setSetupData,
  resetSetupData,
  setSetupImage,
  setSetupImageUrl,
  setSettingsImageUrl,
  setNewSetupCompany,
  setCountries,
} = chatSlice.actions

export default chatSlice.reducer
