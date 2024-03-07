import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarActivePage: 'Dashboard',
  isEditContact: false,
  selectedContact: 0,
  showAddContact: false,
  selectedCompany: '',
  isModalOpen: false,
  activeItem: '',
  operators: [],
  notificationSetting: {},
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSidebarActivePage: (state, action) => {
      state.sidebarActivePage = action.payload
    },
    setIsEditContact: (state, action) => {
      state.isEditContact = action.payload
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload
    },
    setOperators: (state, action) => {
      state.operators = action.payload
    },
    setShowAddContact: (state, action) => {
      state.showAddContact = action.payload
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload
    },
    setNotificationSetting: (state, action) => {
      state.notificationSetting = action.payload
    },
  },
})

export const {
  setSidebarActivePage,
  setIsEditContact,
  setSelectedContact,
  setOperators,
  setShowAddContact,
  setSelectedCompany,
  setIsModalOpen,
  setActiveItem,
  setNotificationSetting,
} = dashboardSlice.actions

export default dashboardSlice.reducer
