import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "../redux/filesSlice";
import modalReducer from "../redux/modalSlice";
import darkModeReducer from "./darkModeSlice";

export const store = configureStore({
  reducer: {
    files: filesReducer,
    modal: modalReducer,
    darkMode: darkModeReducer,
  },
});
