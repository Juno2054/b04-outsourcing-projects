import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  uid: '',
  displayName: null,
  email: '',
  photoURL: null,
  profileIntro: '',
  profilePhotoURLKey: '',
  userData: [],
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogIn(state, { payload }) {
      state.uid = payload.uid
      state.email = payload.email
      state.photoURL =
        payload.photoURL ||
        process.env.PUBLIC_URL + '/asset/img/login/profileDefaultImg.jpg'
      state.displayName = payload.displayName
      state.currentUser = true
    },

    userLogOut(state) {
      return initialState
    },

    userCurrentState(state, { payload }) {
      state.currentUser = payload.currentUser
    },

    userUpdateProfile(state, { payload }) {
      state.photoURL = payload.photoURL
      state.profilePhotoURLKey = payload.profilePhotoURLKey
      state.intro = payload.intro
    },
  },
})

export const { userLogIn, userLogOut, userCurrentState, userUpdateProfile } =
  user.actions
export default user.reducer
