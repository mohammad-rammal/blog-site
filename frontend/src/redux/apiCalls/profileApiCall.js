import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { profileAction } from "../slices/profileSlice";

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
