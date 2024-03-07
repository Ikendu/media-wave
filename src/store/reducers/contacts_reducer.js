import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  visitors: [],
  details: [],
  selectedVisitor: 0,
  lastSelectedContact: null,
  lastSelectedVisitor: null,
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSelectedVisitor: (state, action) => {
      state.selectedVisitor = action.payload
    },
    setLastSelectedContact: (state, action) => {
      state.lastSelectedContact = action.payload
    },
    setLastSelectedVisitor: (state, action) => {
      state.lastSelectedVisitor = action.payload
    },
    setContacts: (state, action) => {
      state.items = action.payload
    },
    addContact: (state, action) => {
      state.items.push(action.payload)
    },
    deleteContact: (state, action) => ({
      ...state,
      items: state.items.filter((contact) => contact.id !== action.payload),
    }),
    editContact: (state, action) => {
      const { id, updatedContact } = action.payload
      const contactIndex = state.items.findIndex((contact) => contact.id === id)
      if (contactIndex !== -1) {
        state.items[contactIndex] = {
          ...state.items[contactIndex],
          ...updatedContact,
        }
      }
    },
    setDetails: (state, action) => {
      state.details = action.payload
    },
    setVisitors: (state, action) => {
      state.visitors = action.payload
    },
  },
})

export const {
  setSelectedVisitor,
  setLastSelectedContact,
  setLastSelectedVisitor,
  setContacts,
  addContact,
  deleteContact,
  editContact,
  setDetails,
  setVisitors,
} = contactsSlice.actions

export default contactsSlice.reducer
