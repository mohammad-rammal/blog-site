import baseUrl from "../../Api/baseURL";
import { toast } from "react-toastify";
import { postAction } from "../slices/postSlice";

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

      dispatch(postAction.deleteCommentFromPost(commentId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
