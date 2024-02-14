import './style.css';
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  const maxPageNumbers = 10;

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  let displayedPageNumbers = [];

  if (pageNumbers.length <= maxPageNumbers) {
    displayedPageNumbers = pageNumbers;
  } else {
    const startPageIndex = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    const endPageIndex = Math.min(startPageIndex + maxPageNumbers - 1, pageNumbers.length);

    displayedPageNumbers = [
      ...pageNumbers.slice(startPageIndex - 1, endPageIndex),
      '...',
      pageNumbers[pageNumbers.length - 1], 
    ];
  }
  const handlePageClick = (number) => {
    if (number === '...') return; 
    paginate(number);
  };

  return (
    <ul className="pagination">
      {displayedPageNumbers.map((number) => (
        <li key={number}>
          {number === '...' ? (
            <span>{number}</span>
          ) : (
            <a onClick={() => handlePageClick(number)} href="#" className="pagination-link">
              {number}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

