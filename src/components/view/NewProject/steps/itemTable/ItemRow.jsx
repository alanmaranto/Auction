import React from "react";
import { Table } from "semantic-ui-react";
import EditableCell from "./EditableCell";
import TableCell from "./TableCell";
import {
  formatCurrency,
} from "../../../../../helpers/currency";

const ProductRow = ({
  items,
  item,
  handleItemsTable,
  handleRowDel,
  index,
  id,
  currency,
}) => {
  return (
    <Table.Row key={id}>
      <TableCell index={index} />
      <EditableCell
        handleItemsTable={handleItemsTable}
        cellData={{
          type: "code",
          value: item.code,
          id: item.id,
        }}
      />
      <EditableCell
        handleItemsTable={handleItemsTable}
        cellData={{
          type: "name",
          value: item.name,
          id: item.id,
        }}
      />
      <EditableCell
        handleItemsTable={handleItemsTable}
        cellData={{
          type: "unitMeasure",
          value: item.unitMeasure,
          id: item.id,
        }}
      />
      <EditableCell
        handleItemsTable={handleItemsTable}
        cellData={{
          type: "quantity",
          value: item.quantity,
          id: item.id,
        }}
      />
      <EditableCell
        handleItemsTable={handleItemsTable}
        cellData={{
          type: "basePrice",
          value: item.basePrice,
          id: item.id,
        }}
      />
      <Table.Cell>
        {currency && formatCurrency(item.totalPrice || 0, currency)}
      </Table.Cell>
      <TableCell
        buttonAction={() => {
          if (items) {
            const index = items.indexOf(item);
            items.splice(index, 1);
            handleRowDel(items);
          }
        }}
        color="blue"
        size="small"
        icon="delete"
      />
    </Table.Row>
  );
};

export default ProductRow;
