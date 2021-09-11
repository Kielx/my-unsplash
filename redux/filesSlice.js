import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
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
    addFile: (state, action) => {
      state.files.unshift(action.payload);
    },
    addFiles: (state, action) => {
      state.files.push(...action.payload);
    },
    removeFile: (state, action) => {
      state.files = state.files.filter((currentFile) => {
        return currentFile.name !== action.payload.name;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFiles, addFile, addFiles, removeFile } = filesSlice.actions;

export default filesSlice.reducer;
