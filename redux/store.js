import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "../redux/filesSlice";
import modalReducer from "../redux/modalSlice";

export const store = configureStore({
  reducer: {
    files: filesReducer,
    modal: modalReducer,
  },
});
