import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }

  const setCurrentPageHandler = (page) => () => {
    setCurrentPage(page);
  };

  const previousHandler = () => {
    setCurrentPage((current) => current - 1);
  };

  const nextHandler = () => {
    setCurrentPage((current) => current + 1);
  };

  return (
    <div className="pagination">
      <button
        onClick={previousHandler}
        disabled={currentPage === 1}
        className="page previous"
      >
        Previous
      </button>
      {generatedPages.map((page) => {
        return (
          <div
            onClick={setCurrentPageHandler(page)}
            key={page}
            className={currentPage === page ? "page active" : "page"}
          >
            {page}
          </div>
        );
      })}
      <button
        onClick={nextHandler}
        disabled={currentPage === pages}
        className="page next"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
