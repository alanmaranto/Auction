import React from "react";
import { Table, Input } from "semantic-ui-react";

const EditableCell = ({ cellData, handleItemsTable }) => {
  return (
    <Table.Cell>
      <Input
        type="text"
        name={cellData.type}
        id={cellData.id}
        value={cellData.value}
        onChange={handleItemsTable}
        size="mini"
      />
    </Table.Cell>
  );
};

export default EditableCell;
