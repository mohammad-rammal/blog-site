import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import Swal from "sweetalert2";
import { posts } from "../../assets/dummyData";

const PostsTable = () => {
  // Delete Post Handler
  const deletePostHandler = () => {
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
          text: "Post has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Post</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src="/images/post-avatar.png"
                        alt=""
                        className="table-post-image"
                      />
                      <span className="table-postname">
                        {item.user.username}
                      </span>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className="table-button-group">
                      <button>
                        <Link to={`/posts/details/${item._id}`}>View Post</Link>
                      </button>
                      <button onClick={deletePostHandler}>Delete Post</button>
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
export default PostsTable;
