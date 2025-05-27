import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { profileAction } from "../slices/profileSlice";
import { authAction } from "../slices/authSlice";

// Get User Profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get(`/api/users/profile/${userId}`);

      dispatch(profileAction.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Upload User Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.post(
        "/api/users/profile/profile-photo-upload",
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data", // To make json file
          },
        }
      );

      dispatch(profileAction.setProfile(data.profilePhoto));
      dispatch(authAction.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      // modify the user in local storage in new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update User Profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.put(
        `/api/users/profile/${userId} `,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileAction.updateProfile(data));
      dispatch(authAction.setUsername(data.username));

      // modify the user in local storage with username
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Profile (account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileAction.setLoading());
      const { data } = await baseUrl.delete(`/api/users/profile/${userId} `, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileAction.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(profileAction.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileAction.clearLoading());
    }
  };
}
