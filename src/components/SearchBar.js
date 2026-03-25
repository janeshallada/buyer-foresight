import React from "react";

const SearchBar = ({ setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;