import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/apiCalls/postApiCall";

const SearchBarInput = ({ setResults, setToggle, input, setInput }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post || []);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const inputHandler = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setResults([]);
      setToggle(false);
    } else {
      const results = posts.filter((post) =>
        post.title?.toLowerCase().includes(value.toLowerCase())
      );
      setResults(results);
      setToggle(true);
    }
  };

  const clearHandler = () => {
    setInput("");
    setToggle(false);
  };

  return (
    <div className="input-wrapper">
      <i className="bi bi-search search-icon"></i>
      <input
        value={input}
        onChange={inputHandler}
        type="text"
        placeholder="Search..."
      />
      <i onClick={clearHandler} className="bi bi-x"></i>
    </div>
  );
};

export default SearchBarInput;
