import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isError: false,
    isSuccess: false,
  },
  reducers: {
    setError(state) {
      state.isError = true;
    },
    setSuccess(state) {
      state.isSuccess = true;
    },
    resetState(state) {
      state.isError = false;
      state.isSuccess = false;
    },
  },
});

const passwordReducer = passwordSlice.reducer;
const passwordAction = passwordSlice.actions;

export { passwordAction, passwordReducer };
