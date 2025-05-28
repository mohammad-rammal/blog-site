import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { passwordAction } from "../slices/passwordSlice";

// Forgot Password
export function forgotPassword(email) {
  return async () => {
    try {
      const { data } = await baseUrl.post("/api/password/reset-password-link", {
        email,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Reset Password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {
      await baseUrl.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      console.log(error);
      dispatch(passwordAction.setError());
    }
  };
}

// Reset The Password
export function resetPassword(newPassword, user) {
  return async (dispatch) => {
    // ✅ Add dispatch
    try {
      const { data } = await baseUrl.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );

      dispatch(passwordAction.setSuccess());
      toast.success(data.message);
    } catch (error) {
      dispatch(passwordAction.setError());
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };
}
