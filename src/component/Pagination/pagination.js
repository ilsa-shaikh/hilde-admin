import React from "react";
import "./Pagination.css";

function Pagination({ pagedata, onPageChange }) {
  const getPageRangeText = () => {
    const startRange = (pagedata.current_pages - 1) * pagedata.per_page + 1;
    const endRange = Math.min(
      pagedata.current_pages * pagedata.per_page,
      pagedata.total
    );

    return `${startRange}-${endRange} of ${pagedata.total}`;
  };
  return (
    <div className="pagination">
      <p> Showing {getPageRangeText()}</p>
      <div className="paginationbtns">
        <button
          disabled={!pagedata.has_previous}
          className="pagination_button"
          onClick={() => onPageChange(pagedata.current_pages - 1)}
        >
          Previous
        </button>

        <button className="pagination_activebutton">
          {/* {pagedata.current_pages} */}1
        </button>

        <button
          disabled={!pagedata.has_next}
          onClick={() => onPageChange(pagedata.current_pages + 1)}
          className="pagination_button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
