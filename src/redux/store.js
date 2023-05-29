import { configureStore } from "@reduxjs/toolkit";

// Features
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/tweets/tweetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: postReducer,
  },
});
