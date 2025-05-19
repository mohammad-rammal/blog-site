import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() == "") return toast.warn("Password is required!");
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Reset Password </h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            className="form-input"
            id="password"
            placeholder="Enter Your New Password"
          />
        </div>
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};
export default ResetPassword;
