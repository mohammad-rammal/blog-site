import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ categories }) => {
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
