import { Link } from "react-router-dom";
import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() == "") return toast.warn("Email is required!");
    if (password.trim() == "") return toast.warn("Password is required!");

    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Login To Your Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
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
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forgot your password?
        <Link to="/forgot-password"> Forgot Password</Link>
      </div>
    </section>
  );
};
export default Login;
