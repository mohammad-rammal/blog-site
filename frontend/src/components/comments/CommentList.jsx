import Swal from "sweetalert2";
import "./comment-list.css";
import moment from "moment";

import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";

const CommentList = ({ comments, user }) => {
  const [updateComment, setUpdateComment] = useState(false);

  // Delete Comment Handler
  const deleteCommentHandler = () => {
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
        Swal.fire({
          title: "Deleted!",
          text: "Your comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Toggle Edit Comment
  const updateCommentHandler = () => {
    setUpdateComment(true);
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
                  onClick={updateCommentHandler}
                  className="bi bi-pencil-square"
                ></i>
                <i
                  onClick={deleteCommentHandler}
                  className="bi bi-trash-fill"
                ></i>
              </div>
            )}
          </div>
        );
      })}
      {updateComment && (
        <UpdateCommentModal setUpdateComment={setUpdateComment} />
      )}
    </div>
  );
};
export default CommentList;
