import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentSignupEmail: null,
    forgotPasswordStep: 0,
    companyID: '',
    allCompanies: [],
    selectedComp: {},
    userData: {},
  },

  reducers: {
    setCurrentSignupEmail: (state, action) => {
      state.currentSignupEmail = action.payload
    },
    setForgotPasswordStep: (state, action) => {
      state.forgotPasswordStep = action.payload
    },
    setCompanyID: (state, action) => {
      state.companyID = action.payload
    },
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload
    },
    setSelectedComp: (state, action) => {
      state.selectedComp = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

export const {
  setCurrentSignupEmail,
  setForgotPasswordStep,
  setCompanyID,
  setAllCompanies,
  setSelectedComp,
  setUserData,
} = authSlice.actions

export default authSlice.reducer
