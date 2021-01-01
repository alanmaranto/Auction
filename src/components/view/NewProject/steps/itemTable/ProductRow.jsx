import React from "react";
import { Table } from "semantic-ui-react";
import EditableCell from "./EditableCell";
import TableCell from "./TableCell";

const ProductRow = ({
  product,
  onProductTableUpdate,
  onDeleteEvent,
  index,
  key,
}) => {
  const deleteRow = () => {
    onDeleteEvent(product);
  };

  return (
    <Table.Row>
      <TableCell name={index} />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "code",
          value: product.code,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "name",
          value: product.name,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "unitMeasure",
          value: product.unitMeasure,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "quantity",
          value: product.quantity,
          id: product.id,
        }}
      />
      <EditableCell
        onProductTableUpdate={onProductTableUpdate}
        cellData={{
          type: "basePrice",
          value: product.basePrice,
          id: product.id,
        }}
      />
      <TableCell name="Aqui va el total" />
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
