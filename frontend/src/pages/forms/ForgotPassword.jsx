import "./form.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() == "") return toast.warn("Email is required!");

    dispatch(forgotPassword(email));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Forgot Password </h1>
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
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};
export default ForgotPassword;
