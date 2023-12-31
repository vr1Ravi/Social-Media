import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: [],
    error: null,
    newPost: null,
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
      state.loading = false;
      state.error = action.payload;
    },
    uploadPostRequest: (state) => {
      state.loading = true;
    },
    uploadPostSuccess: (state, action) => {
      state.loading = false;
      state.newPost = action.payload;
    },
    uploadPostFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  postOfFollowingUsersRequest,
  postOfFollowingUsersSuccess,
  postOfFollowingUsersFaliure,
  uploadPostRequest,
  uploadPostSuccess,
  uploadPostFaliure,
} = postSlice.actions;
export default postSlice.reducer;
