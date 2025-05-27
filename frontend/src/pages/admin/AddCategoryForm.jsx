import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "")
      return toast.warning("Category Title Is Required!");

    dispatch(createCategory({ title }));
    setTitle("");
  };

  // Category Title Handler
  const categoryTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            value={title}
            onChange={categoryTitleHandler}
            type="text"
            id="title"
            placeholder="Enter Category Title"
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};
export default AddCategoryForm;
