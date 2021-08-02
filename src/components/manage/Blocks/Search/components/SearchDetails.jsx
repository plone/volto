import React from 'react';

const SearchDetails = ({ total, text, as = 'h4' }) => {
  const El = as;
  return (
    <El>
      {text ? `Searched for: ${text}. ` : ''}Search results: {total}
    </El>
  );
};

export default SearchDetails;
