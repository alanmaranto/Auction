import React from "react";
import { Statistic } from "semantic-ui-react";
import SearchBar from "./itemTable/SearchBar";
import ItemTable from "./itemTable/ItemTable";
import { formatCurrency } from "../../../../helpers/currency";

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
        currency={currency}
      />
      <Statistic horizontal size="mini" color="blue">
        <Statistic.Label style={{ paddingRight: 10 }}>
          Total de la subasta
        </Statistic.Label>
        <Statistic.Value>
          {formatCurrency(totalItemsPrice, currency)} {currency}
        </Statistic.Value>
      </Statistic>
    </div>
  );
};

export default ItemsTableContainer;
