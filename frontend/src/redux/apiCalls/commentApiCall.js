import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { postAction } from "../slices/postSlice";
import { commentAction } from "../slices/commentSlice";

// Create Comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.post("/api/comments", newComment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(postAction.addCommentToPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Comment
export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.put(
        `/api/comments/${commentId}`,
        comment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(postAction.updateComment(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await baseUrl.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(commentAction.deleteComment(commentId));
      dispatch(postAction.deleteCommentFromPost(commentId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch All Comments
export function fetchAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await baseUrl.get(`/api/comments`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(commentAction.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
