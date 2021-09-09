import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: null,
  selectedFile: null,
  selectedFileLabel: null,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.files = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setSelectedFileLabel: (state, action) => {
      state.selectedFileLabel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFiles, setSelectedFile, setSelectedFileLabel } =
  filesSlice.actions;

export default filesSlice.reducer;
