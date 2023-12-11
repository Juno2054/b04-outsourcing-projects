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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
  devTools: true,
})

export default store
