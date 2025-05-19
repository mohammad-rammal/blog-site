import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderRight = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Dropdown Handler
  const dropdownHandler = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span onClick={dropdownHandler} className="header-right-username">
              {user?.username}
            </span>
            <img
              src={user.profilePhoto.url}
              alt="user photo"
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={dropdownHandler}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};
export default HeaderRight;
