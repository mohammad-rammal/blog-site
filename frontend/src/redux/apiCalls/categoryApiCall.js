import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { categoryAction } from "../slices/categorySlice";

// Fetch All Categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get("/api/categories");

      dispatch(categoryAction.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
