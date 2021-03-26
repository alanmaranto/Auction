import React from "react";
import { Statistic } from "semantic-ui-react";
import SearchBar from "./itemTable/SearchBar";
import ItemTable from "./itemTable/ItemTable";

const ItemsTableContainer = ({
  filterText,
  items,
  handleUserInput,
  handleItemsTable,
  totalItemsPrice,
  currency,
  setItems,
}) => {
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onUserInput={handleUserInput}
        items={items}
        handleAddRow={setItems}
      />
      <ItemTable
        handleItemsTable={handleItemsTable}
        handleRowDel={setItems}
        items={items}
        filterText={filterText}
      />
      <Statistic horizontal size="mini" color="blue">
        <Statistic.Label style={{ paddingRight: 10 }}>
          Total de la subasta
        </Statistic.Label>
        <Statistic.Value>
          {totalItemsPrice} {currency}
        </Statistic.Value>
      </Statistic>
    </div>
  );
};

export default ItemsTableContainer;
