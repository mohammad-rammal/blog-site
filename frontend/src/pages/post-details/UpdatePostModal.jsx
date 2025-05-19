import { useState } from "react";
import "./update-post.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { toast } from "react-toastify";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const titleHandler = (e) => setTitle(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const descriptionHandler = (content) => setDescription(content);

  const plainDescription = description.replace(/<[^>]*>/g, "").trim();

  // Close Update Post Handler
  const closeUpdatePostHandler = () => {
    setUpdatePost(false);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Title is required!");
    if (plainDescription.trim() === "")
      return toast.error("Description is required!");
    if (category.trim() === "") return toast.error("Category is required!");
  };

  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={closeUpdatePostHandler}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          type="text"
          className="update-post-input"
          value={title}
          onChange={titleHandler}
        />
        <select
          value={category}
          onChange={categoryHandler}
          className="update-post-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          <option value="music">music</option>
          <option value="travel">travel</option>
        </select>
        <SunEditor
          setOptions={{
            height: 200,
            resizingBar: false,
            buttonList: [
              ["undo", "redo"],
              ["formatBlock"],
              ["bold", "underline", "italic", "strike"],
              ["fontColor", "hiliteColor"],
            ],
          }}
          placeholder="Post Description"
          setContents={description}
          onChange={descriptionHandler}
          className="update-post-textarea"
        />
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};
export default UpdatePostModal;
