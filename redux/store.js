import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "../redux/filesSlice";

export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});
