import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import Swal from "sweetalert2";

const UsersTable = () => {
  // Delete User Handler
  const deleteUserHandler = () => {
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
          text: "User has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src="/images/user-avatar.png"
                        alt=""
                        className="table-user-image"
                      />
                      <span className="table-username">Mohammad Rammal</span>
                    </div>
                  </td>
                  <td>mohammad@email.com</td>
                  <td>
                    <div className="table-button-group">
                      <button>
                        <Link to={`/profile/1`}>View Profile</Link>
                      </button>
                      <button onClick={deleteUserHandler}>Delete User</button>
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
export default UsersTable;
