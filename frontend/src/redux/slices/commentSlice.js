import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {},
  reducers: {},
});

const commentReducer = commentSlice.reducer;
const commentAction = commentSlice.actions;

export { commentAction, commentReducer };
