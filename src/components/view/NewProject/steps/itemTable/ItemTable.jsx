/* eslint-disable array-callback-return */

import React from "react";
import { Table } from "semantic-ui-react";
import ItemRow from "./ItemRow";
import { TableHeader } from "../../../../../core/AuctionTable/TableHeader";

const ItemsTable = ({ handleItemsTable, handleRowDel, items, filterText }) => {
  const itemRow = items.map((item, index) => {
    if (item.name.indexOf(filterText) === -1) {
      return;
    }
    return (
      <ItemRow
        item={item}
        handleItemsTable={handleItemsTable}
        handleRowDel={handleRowDel}
        id={item.id}
        index={index}
        items={items}
      />
    );
  });

  const itemsHeader = [
    {
      name: "id",
      title: "#",
      sorted: false,
    },
    {
      name: "code",
      title: "Código",
      sorted: false,
    },
    {
      name: "name",
      title: "Artículo",
      sorted: false,
    },
    {
      name: "unitMeasure",
      title: "Unidad de medida",
      sorted: false,
    },
    {
      name: "quantity",
      title: "Cantidad",
      sorted: false,
    },
    {
      name: "basePrice",
      title: "Precio base",
      sorted: false,
    },
    {
      name: "totalPrice",
      title: "Total",
      sorted: false,
      buttonActions: true,
    },
    {
      name: "",
      title: "",
      sorted: false,
      buttonActions: true,
    },
  ];

  return (
    <div className="items-table-container">
      <Table compact color="blue" size="small">
        <TableHeader columns={itemsHeader} />
        <Table.Body>{itemRow}</Table.Body>
      </Table>
    </div>
  );
};

export default ItemsTable;
