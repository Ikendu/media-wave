import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPlan: [],
}

const PricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    setPlan: (state, action) => {
      state.selectedPlan = action.payload
    },
  },
})

export const { setPlan } = PricingSlice.actions

export default PricingSlice.reducer
