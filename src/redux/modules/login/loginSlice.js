import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  uid: '',
  displayName: null,
  email: '',
  photoURL: null,
  profileIntro: '',
  profilePhotoURLKey: '',
  id: '',
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogIn(state, { payload }) {
      console.log(payload)
      state.uid = payload.uid
      state.email = payload.email
      state.photoURL =
        payload.photoURL ||
        process.env.PUBLIC_URL + '/asset/img/login/profileDefaultImg.jpg'
      state.displayName = payload.displayName
      state.currentUser = true
      state.id = payload.id
      state.profileIntro = payload.profileIntro
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
      state.profileIntro = payload.profileIntro
    },
  },
})

export const { userLogIn, userLogOut, userCurrentState, userUpdateProfile } =
  user.actions
export default user.reducer
