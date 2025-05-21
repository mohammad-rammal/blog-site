import baseUrl from "../../Api/baseURL";
import { authAction } from "../slices/authSlice";
import { toast } from "react-toastify";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      // Fetch
      // const res = await fetch("http://localhost:5000/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify(user),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await res.json();

      const { data } = await baseUrl.post("/api/auth/login", user);

      dispatch(authAction.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.post("/api/auth/register", user);

      dispatch(authAction.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authAction.logout());
    localStorage.removeItem("userInfo");
  };
}
