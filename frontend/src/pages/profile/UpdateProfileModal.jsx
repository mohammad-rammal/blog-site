import { useState } from "react";
import "./update-profile.css";

const user = {
  username: "Mohammad",
  bio: "Welcome To My Profile",
};

const UpdateProfileModal = ({ setUpdateProfile }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => setUsername(e.target.value);
  const bioHandler = (e) => setBio(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  // Close Update Profile Handler
  const closeUpdateProfileHandler = () => {
    setUpdateProfile(false);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    const updatedUser = { username, bio };
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr username="close">
          <i
            onClick={closeUpdateProfileHandler}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-username">Update Profile</h1>
        <input
          type="text"
          className="update-profile-input"
          value={username}
          onChange={usernameHandler}
          placeholder="Username"
        />
        <input
          type="text"
          className="update-profile-input"
          value={bio}
          onChange={bioHandler}
          placeholder="Bio"
        />
        <input
          type="password"
          className="update-profile-input"
          value={password}
          onChange={passwordHandler}
          placeholder="Password"
        />

        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};
export default UpdateProfileModal;
