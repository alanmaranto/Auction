import React from "react";
import { Table } from "semantic-ui-react";
import EditableCell from "./EditableCell";
import TableCell from "./TableCell";

const ProductRow = ({
  item,
  handleItemsTable,
  handleRowDel,
  index,
  key,
}) => {
  const deleteRow = () => {
    handleRowDel(item);
  };

  return (
    <Table.Row>
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
      <Table.Cell>{item.quantity * item.basePrice}</Table.Cell>
      <TableCell
        buttonAction={deleteRow}
        color="blue"
        size="small"
        icon="delete"
      />
    </Table.Row>
  );
};

export default ProductRow;
