import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    postOfFollowingUsersRequest: (state) => {
      state.loading = true;
    },
    postOfFollowingUsersSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postOfFollowingUsersFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    uploadPostRequest: (state) => {
      state.loading = true;
    },
    uploadPostSuccess: (state) => {
      state.loading = false;
    },
    uploadPostFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, message) => {
      state.loading = false;
      state.message = message;
    },
    deletePostFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },

    postCommentRequest: () => {},
  },
});
export const {
  postOfFollowingUsersRequest,
  postOfFollowingUsersSuccess,
  postOfFollowingUsersFaliure,
  uploadPostRequest,
  uploadPostSuccess,
  uploadPostFaliure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFaliure,
  removeError,
} = postSlice.actions;
export default postSlice.reducer;
