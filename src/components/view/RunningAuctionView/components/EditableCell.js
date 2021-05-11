import React from "react";
import { Table, Input } from "semantic-ui-react";

const EditableCell = ({ cellData, handleSuppliersItemsTable }) => {
  return (
    <Table.Cell>
      <Input
        type="text"
        name={cellData.type}
        id={cellData.id}
        value={cellData.value}
        onChange={(e, data) =>
          handleSuppliersItemsTable(cellData.index, data.value)
        }
        size="mini"
      />
    </Table.Cell>
  );
};

export default EditableCell;
