import { configureStore } from "@reduxjs/toolkit";
import user from "./Slices/userSlice";
import posts from "./Slices/postSlice";

const store = configureStore({
  reducer: {
    user,
    posts,
  },
});
export default store;
