import { configureStore } from "@reduxjs/toolkit";
import user from "./Slices/userSlice";
import posts from "./Slices/postSlice";
import followUnfollow from "./Slices/followUnfollowSlice";
const store = configureStore({
  reducer: {
    user,
    posts,
    followUnfollow,
  },
});
export default store;
