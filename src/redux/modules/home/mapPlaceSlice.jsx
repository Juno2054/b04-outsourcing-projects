import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mapPlaces: [],
  selectedButton: null,
  selectedButtonData: null,
}

const mapPlaceSlice = createSlice({
  name: 'mapPlace',
  initialState,
  reducers: {
    setMapPlaces(state, action) {
      state.mapPlaces = action.payload
    },
    setSelectedButton(state, action) {
      state.selectedButton = action.payload
    },
    setSelectedButtonData(state, action) {
      state.selectedButtonData = action.payload
    },
  },
})

export const { setMapPlaces, setSelectedButton, setSelectedButtonData } =
  mapPlaceSlice.actions
export default mapPlaceSlice.reducer
