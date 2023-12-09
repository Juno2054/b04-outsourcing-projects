import { configureStore } from '@reduxjs/toolkit'
import mapPlaceSlice from '../modules/home/mapPlaceSlice'
import postsSlice from '../modules/home/postsSlice'
import loginSlice from '../modules/login/loginSlice'
import sampleUser from '../modules/sample/sampleUserSlice'

const store = configureStore({
  reducer: {
    sampleUser,
    postsSlice,
    mapPlace: mapPlaceSlice,
    loginSlice,
  },
})

export default store
