import { useState, useRef, useEffect } from "react";
import "./header.css";
import SearchBarInput from "./SearchBarInput";
import SearchBarResult from "./SearchBarResult";

const SearchBar = () => {
  const [results, setResults] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [input, setInput] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setToggle(false);
        setInput("");
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar" ref={containerRef}>
      <SearchBarInput
        setResults={setResults}
        setToggle={setToggle}
        input={input}
        setInput={setInput}
      />
      <SearchBarResult
        results={results}
        toggle={toggle}
        setToggle={setToggle}
        setInput={setInput}
      />
    </div>
  );
};

export default SearchBar;
