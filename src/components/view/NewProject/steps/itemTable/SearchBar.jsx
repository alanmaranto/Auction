import React, { useRef } from "react";

const SearchBar = ({ onUserInput, filterText }) => {
  const inputRef = useRef(null);

  const handleChange = () => {
    onUserInput(inputRef.current.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
