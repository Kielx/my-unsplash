import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddOpen: false,
  isDeleteOpen: false,
  deleteFileName: null,
  removeFunction: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsAddOpen: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAddOpen = action.payload;
    },
    setIsDeleteOpen: (state, action) => {
      state.isDeleteOpen = action.payload;
    },
    setDeleteFileName: (state, action) => {
      state.deleteFileName = action.payload;
    },
    setRemoveFunction: (state, action) => {
      state.removeFunction = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsAddOpen,
  setIsDeleteOpen,
  setDeleteFileName,
  setRemoveFunction,
} = modalSlice.actions;

export default modalSlice.reducer;
