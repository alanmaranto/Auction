import React, { useRef } from "react";
import { Button } from "semantic-ui-react";
import "./style.css";

const SearchBar = ({ onUserInput, filterText, handleAddRow, items }) => {
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
      <div style={{ paddingLeft: 10 }}>
        <Button
          content="Agregar artículo"
          onClick={() => {
            const id = (
              +new Date() + Math.floor(Math.random() * 999999)
            ).toString(36);
            const itemRow = {
              id,
              code: "",
              name: "",
              unitMeasure: "",
              quantity: null,
              basePrice: null,
              totalPrice: null,
            };
            items.push(itemRow);
            handleAddRow(items);
          }}
          size="small"
        />
      </div>
    </div>
  );
};

export default SearchBar;
