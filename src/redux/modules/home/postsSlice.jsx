import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  reviewsCommentslist: [
    {
      id: 1,
      comment: '댓글이 없습니다.',
      rating: 5,
      reviewid: 'sdfsfsd',
      title: 'dddf',
    },
  ],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    setCommentslist(state, action) {
      state.reviewsCommentslist = action.payload
    },
    setTextArea(state, action) {
      state.reviewsCommentslist = action.payload
    },
  },
})

export const { setPosts, setCommentslist, setTextArea } = postsSlice.actions

export const selectPosts = (state) => state.postsSlice.posts

export default postsSlice.reducer
