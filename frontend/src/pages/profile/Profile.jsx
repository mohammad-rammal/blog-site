import PostList from "../../components/posts/PostList";
import { posts } from "../../assets/dummyData";
import "./profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Image is missing!");
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
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
          text: "Your account has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Update Profile Modal Handler
  const updateProfileHandler = () => {
    setUpdateProfile(true);
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"}
            alt=""
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="Choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              onChange={fileHandler}
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
            />
            <button type="submit" className="upload-profile-photo-btn">
              Upload
            </button>
          </form>
        </div>
        <h1 className="profile-username">Mohammad Rammal</h1>
        <p className="profile-bio">Welcome To My Profile</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>Sun Feb 03 2024</span>
        </div>
        <button onClick={updateProfileHandler} className="profile-update-btn">
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">Mohammad Posts</h2>
        <PostList posts={posts} />
      </div>
      <div className="delete-account">
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      </div>
      {updateProfile && (
        <UpdateProfileModal setUpdateProfile={setUpdateProfile} />
      )}
    </section>
  );
};
export default Profile;
