import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() == "") return toast.warn("Username is required!");
    if (email.trim() == "") return toast.warn("Email is required!");
    if (password.trim() == "") return toast.warn("Password is required!");

    dispatch(
      registerUser({
        username,
        email,
        password,
      })
    );
  };

  if (registerMessage) {
    Swal.fire({
      title: registerMessage,
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  }

  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            value={username}
            onChange={usernameHandler}
            type="text"
            className="form-input"
            id="username"
            placeholder="Enter Your Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={emailHandler}
            type="email"
            className="form-input"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            className="form-input"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>
        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};
export default Register;
