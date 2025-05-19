import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import Swal from "sweetalert2";

const CommentsTable = () => {
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
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src="/images/comment-avatar.png"
                        alt=""
                        className="table-comment-image"
                      />
                      <span className="table-username">Mohammad Rammal</span>
                    </div>
                  </td>
                  <td>Thank you for the post!!</td>
                  <td>
                    <div className="table-button-group">
                      <button onClick={deleteCommentHandler}>
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
