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
            "Content-Type": "multipart/form-data",
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
