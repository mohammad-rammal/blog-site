import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess } = useSelector((state) => state.password);

  const { userId, token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [token, userId]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() == "") return toast.warn("Password is required!");

    dispatch(
      resetPassword(password, {
        userId,
        token,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found </h1>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};
export default ResetPassword;
