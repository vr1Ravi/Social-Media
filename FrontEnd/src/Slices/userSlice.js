import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    posts: [],
    followers: [],
    following: [],
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.posts = state.user.posts;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.posts = state.user.posts;
      state.followers = state.user.followers;
      state.following = state.user.following;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const {
  updateUserInfo,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
  setUser,
  setPosts,
  registerRequest,
  registerSuccess,
  registerFaliure,
} = userSlice.actions;
export default userSlice.reducer;
