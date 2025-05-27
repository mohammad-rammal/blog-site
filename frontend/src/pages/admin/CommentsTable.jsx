import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import Swal from "sweetalert2";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

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
          text: "Comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comment</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => {
              return (
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={item?.username?.profilePhoto?.url}
                        alt=""
                        className="table-comment-image"
                      />
                      <span className="table-username">
                        {item?.user?.username}
                      </span>
                    </div>
                  </td>
                  <td>{item?.text}</td>
                  <td>
                    <div className="table-button-group">
                      <button onClick={() => deleteCommentHandler(item?._id)}>
                        Delete Comment
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default CommentsTable;
