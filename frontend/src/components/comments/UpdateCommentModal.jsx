import { useState } from "react";
import "./update-comment.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { toast } from "react-toastify";

const UpdateCommentModal = ({ setUpdateComment }) => {
  const [text, setText] = useState("This is so great");

  const textHandler = (e) => setText(e.target.value);

  // Close Update Comment Handler
  const closeUpdateCommentHandler = () => {
    setUpdateComment(false);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Text is required!");
  };

  return (
    <div className="update-comment">
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={closeUpdateCommentHandler}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          type="text"
          className="update-comment-input"
          value={text}
          onChange={textHandler}
        />

        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};
export default UpdateCommentModal;
