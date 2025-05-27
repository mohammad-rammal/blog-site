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

// Create Category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(categoryAction.createCategory(data));
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(categoryAction.deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
