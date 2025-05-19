import Swal from "sweetalert2";
import "./comment-list.css";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";

const CommentList = () => {
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
      <h4 className="comment-list-count">2 Comment</h4>
      {[1, 2].map((comment) => {
        return (
          <div key={comment} className="comment-item">
            <div className="comment-item-info">
              <div className="comment-item-username">Mohammad Rammal</div>
              <div className="comment-item-time">2 hours ago</div>
            </div>
            <p className="comment-item-text">Hello this is amazing</p>
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
