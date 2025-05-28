import { useNavigate } from "react-router-dom";

const SearchBarResult = ({ results, toggle, setToggle, setInput }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/posts/details/${id}`);
    setToggle(false);
    setInput("");
  };

  return (
    <div className="results-list">
      {toggle && results.length > 0 && (
        <>
          {results.map((res) => (
            <div
              key={res._id}
              className="search-results"
              onClick={() => handleClick(res._id)}
            >
              {res.title}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchBarResult;
