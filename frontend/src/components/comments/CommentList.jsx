import Swal from "sweetalert2";
import "./comment-list.css";
import { useDispatch } from "react-redux";
import moment from "moment";

import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments, user }) => {
  const dispatch = useDispatch();

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(commentId));
        Swal.fire({
          title: "Deleted!",
          text: "Your comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comment</h4>
      {comments?.map((comment) => {
        return (
          <div key={comment._id} className="comment-item">
            <div className="comment-item-info">
              <div className="comment-item-username">{comment.username}</div>
              <div className="comment-item-time">
                {moment(comment.createdAt).fromNow()}
              </div>
            </div>

            <p className="comment-item-text">{comment.text}</p>
            {user?._id === comment.user && (
              <div className="comment-item-icon-wrapper">
                <i
                  onClick={() => updateCommentHandler(comment)}
                  className="bi bi-pencil-square"
                ></i>
                <i
                  onClick={() => deleteCommentHandler(comment?._id)}
                  className="bi bi-trash-fill"
                ></i>
              </div>
            )}
          </div>
        );
      })}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};
export default CommentList;
