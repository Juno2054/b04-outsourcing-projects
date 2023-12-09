import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mapPlaces: [],
  selectedButton: null,
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
  },
})

export const { setMapPlaces, setSelectedButton } = mapPlaceSlice.actions
export default mapPlaceSlice.reducer
