import { useState } from "react";
import "./header.css";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <strong>BLOG</strong>
          <i className="bi bi-pencil"></i>
        </div>
        <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
          {toggle ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </div>
      </div>

      <nav
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        className="navbar"
      >
        <ul className="nav-links">
          <li onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-house"></i> Home
          </li>
          <li onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-stickies"></i> Posts
          </li>
          <li onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-journal-plus"></i> Create
          </li>
          <li onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-person-check"></i> Admin Dashboard
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <button className="header-right-link">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </button>
        <button className="header-right-link">
          <i className="bi bi-person-plus"></i>
          <span>Register</span>
        </button>
      </div>
    </header>
  );
};
export default Header;
