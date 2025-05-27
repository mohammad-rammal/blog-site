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

// Get All Posts
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get(`/api/posts`);

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

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postAction.setLoading());

      await baseUrl.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(postAction.setIsPostCreated());
      setTimeout(() => dispatch(postAction.clearIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postAction.clearLoading());
    }
  };
}

// Fetch Single Post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await baseUrl.get(`/api/posts/${postId}`);

      dispatch(postAction.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Toggle Like Post
export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(postAction.setLike(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Post Image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await baseUrl.put(`/api/posts/upload-image/${postId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("New post image uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Post
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postAction.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postAction.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
