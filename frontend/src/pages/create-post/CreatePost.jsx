import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./create-post.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { SpinnerDotted } from "spinners-react";

import { createPost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const titleHandler = (e) => setTitle(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const descriptionHandler = (content) => setDescription(content);
  const fileHandler = (e) => setFile(e.target.files[0]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Title is required!");
    if (description.trim() === "")
      return toast.error("Description is required!");
    if (category.trim() === "") return toast.error("Category is required!");
    if (!file) return toast.error("File is required!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // send form data to the server
    dispatch(createPost(formData));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          value={title}
          onChange={titleHandler}
          type="text"
          placeholder="Post Title"
          className="create-post-input"
        />
        <select
          value={category}
          onChange={categoryHandler}
          className="create-post-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            );
          })}
        </select>
        {/* <textarea
          value={description}
          onChange={descriptionHandler}
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
        ></textarea> */}
        <SunEditor
          setOptions={{
            minHeight: 150,
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
          className="create-post-textarea"
        />

        <input
          onChange={fileHandler}
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn">
          {loading ? <SpinnerDotted size={25} color="white" /> : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
