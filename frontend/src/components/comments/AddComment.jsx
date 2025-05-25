import { useState } from "react";
import { useDispatch } from "react-redux";
import "./add-comment.css";
import { toast } from "react-toastify";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.warn("Please write a comment");

    dispatch(
      createComment({
        text,
        postId,
      })
    );
    setText("");
  };

  const textHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        value={text}
        onChange={textHandler}
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};
export default AddComment;
