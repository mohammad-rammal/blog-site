import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { postAction } from "../slices/postSlice";

// Fetch Posts Based On Page Number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get(`/api/posts?pageNumber=${pageNumber}`);

      dispatch(postAction.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Posts Count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get(`/api/posts/count`);

      dispatch(postAction.setPostsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Posts Based On Category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get(`/api/posts?category=${category}`);

      dispatch(postAction.setPostsCategory(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
