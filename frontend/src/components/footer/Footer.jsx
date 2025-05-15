import { useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const links = [
    { icon: "bi-house", label: "Home", path: "/" },
    { icon: "bi-stickies", label: "Posts", path: "/posts" },
    { icon: "bi-journal-plus", label: "Create", path: "/posts/create-post" },
    {
      icon: "bi-person-check",
      label: "Admin Dashboard",
      path: "/admin-dashboard",
    },
  ];

  return (
    <nav className="navbar-footer">
      <ul className="nav-links-footer">
        {links.map((link, index) => (
          <li
            key={index}
            className="nav-link-footer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              border:
                hoveredIndex === null || hoveredIndex === index
                  ? "1px solid var(--main-color)"
                  : "1px solid transparent",
              transition:
                hoveredIndex === null || hoveredIndex === index
                  ? "all 0.2s ease-in-out "
                  : "all 0.2s ease-in-out ",
            }}
          >
            <Link to={link.path} className="nav-link-footer-link">
              <i className={`bi ${link.icon}`}></i> {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Footer;
