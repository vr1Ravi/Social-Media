import { createSlice } from "@reduxjs/toolkit";

const followUnfolowSlice = createSlice({
  name: "followUnfollow",
  initialState: {
    message: null,
  },
  reducers: {
    followUnfolowRequest: (state) => {
      state.loading = true;
    },
    followUnfolowSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUnfolowFaliure: (state) => {
      state.loading = false;
    },
  },
});
export const {
  followUnfolowRequest,
  followUnfolowSuccess,
  followUnfolowFaliure,
} = followUnfolowSlice.actions;
export default followUnfolowSlice.reducer;
