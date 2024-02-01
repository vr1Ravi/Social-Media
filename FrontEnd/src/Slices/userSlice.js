import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    loading: false,
    curSearchUser: null,
    followers: [],
    followings: [],
  },

  reducers: {
    setCurSearchUser: (state, action) => {
      state.curSearchUser = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      state.followers = state.user.followers;
      state.followings = state.user.following;
    },
    loginFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
    },
    logoutFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.followers = state.user.followers;
      state.followings = state.user.following;
    },
    loadUserFaliure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.loading = false;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
    },
    registerFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    updateUserInfo: (state, action) => {
      state.followings = action.payload.following;
      state.followers = action.payload.followers;
    },
  },
});

export const {
  updateUserInfo,
  makeBoing,
  setCurSearchUser,
  loginRequest,
  loginSuccess,
  loginFaliure,
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFaliure,
  registerRequest,
  registerSuccess,
  registerFaliure,
} = userSlice.actions;
export default userSlice.reducer;
