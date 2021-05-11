import React from "react";
import { Table } from "semantic-ui-react";
import { formatCurrency } from "../../../../helpers/currency";
import EditableCell from "./EditableCell";
import TableCell from "./TableCell";

const SupplierRow = ({
  item,
  handleSuppliersItemsTable,
  index,
  id,
  currency,
}) => {
  return (
    <Table.Row key={id}>
      <TableCell index={index} />
      <TableCell name={item.code} />
      <TableCell name={item.name} />
      <TableCell name={item.unitMeasure} />
      <TableCell name={item.quantity} />
      <EditableCell
        handleSuppliersItemsTable={handleSuppliersItemsTable}
        cellData={{
          type: "basePrice",
          value: item.basePrice,
          id: item.id,
          index,
        }}
      />
      <TableCell
        name={currency && formatCurrency(item.totalPrice || 0, currency)}
      />
    </Table.Row>
  );
};

export default SupplierRow;
