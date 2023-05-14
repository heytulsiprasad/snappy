import { configureStore } from "@reduxjs/toolkit";

// Features
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
