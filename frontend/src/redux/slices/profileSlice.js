import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileAction = profileSlice.actions;

export { profileAction, profileReducer };
