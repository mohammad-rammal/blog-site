import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./sidebar.css";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((items) => {
          return (
            <Link
              className="sidebar-link"
              key={items._id}
              to={`/posts/categories/${items.title}`}
            >
              {items.title}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
export default Sidebar;
