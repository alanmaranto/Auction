import React from "react";
import { Table, Input } from "semantic-ui-react";

const EditableCell = ({ cellData, onProductTableUpdate }) => {
  return (
    <Table.Cell>
      <Input
        type="text"
        name={cellData.type}
        id={cellData.id}
        value={cellData.value}
        onChange={onProductTableUpdate}
        size="mini"
      />
    </Table.Cell>
  );
};

export default EditableCell;
