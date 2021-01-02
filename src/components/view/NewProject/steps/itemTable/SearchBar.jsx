import React, { useRef } from "react";
import { Button } from "semantic-ui-react";
import "./style.css";

const SearchBar = ({ onUserInput, filterText, handleAddRow }) => {
  const inputRef = useRef(null);

  const handleChange = () => {
    onUserInput(inputRef.current.value);
  };

  return (
    <div style={{ display: "flex", paddingBottom: 10 }}>
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        ref={inputRef}
        onChange={handleChange}
        className="item-table-search-bar"
      />
      <div style={{ paddingLeft: 10}}>
        <Button
          content="Agregar artículo"
          onClick={handleAddRow}
          size="small"
        />
      </div>
    </div>
  );
};

export default SearchBar;
