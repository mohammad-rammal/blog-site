import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./update-comment.css";
import { toast } from "react-toastify";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(commentForUpdate?.text);

  const textHandler = (e) => setText(e.target.value);

  // Close Update Comment Handler
  const closeUpdateCommentHandler = () => {
    setUpdateComment(false);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Text is required!");

    dispatch(updateComment(commentForUpdate?._id, { text }));
    setUpdateComment(false);
  };

  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setUpdateComment(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="update-comment">
      <form
        ref={modalRef}
        onSubmit={formSubmitHandler}
        className="update-comment-form"
      >
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
