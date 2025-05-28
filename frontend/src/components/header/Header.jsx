import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";
import SearchBar from "./SearchBar";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header>
      <div className="header">
        <HeaderLeft toggle={toggle} setToggle={setToggle} />
        <SearchBar />
        <Navbar toggle={toggle} setToggle={setToggle} />
        <HeaderRight />
      </div>
    </header>
  );
};
export default Header;
