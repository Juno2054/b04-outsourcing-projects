import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  uid: '',
  displayName: null,
  email: '',
  photoURL: null,
  intro: '',
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
      state.id = payload.id
      state.intro = payload.intro
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
      state.displayName = payload.displayName
      state.id = payload.id
    },
  },
})

export const { userLogIn, userLogOut, userCurrentState, userUpdateProfile } =
  user.actions
export default user.reducer