import "./profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import PostItem from "../../components/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isProfileDeleted) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isProfileDeleted, navigate]);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Image is missing!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
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
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
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

  if (loading) {
    return (
      <div className="profile-loader">
        <SpinnerCircularFixed size={85} color="blue" />
      </div>
    );
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />

          {user?._id === profile?._id && (
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
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>

        {user?._id === profile?._id && (
          <button onClick={updateProfileHandler} className="profile-update-btn">
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {Array.isArray(profile?.posts) && profile?.posts?.length === 0 ? (
          <div className="profile-posts-list-empty">
            <h3>You did not write any post</h3>
          </div>
        ) : (
          profile?.posts &&
          profile?.posts?.map((post) => (
            <PostItem
              key={post._id}
              items={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))
        )}
      </div>

      <div className="delete-account">
        {user?._id === profile?._id && (
          <button onClick={deleteAccountHandler} className="delete-account-btn">
            Delete Your Account
          </button>
        )}
      </div>
      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};
export default Profile;
