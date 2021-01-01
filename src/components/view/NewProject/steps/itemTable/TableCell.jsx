import React from "react";
import { Table, Button } from "semantic-ui-react";

const TableCell = ({ name, buttonAction, color, size, buttonTitle, icon }) => {
  return (
    <Table.Cell>
      {buttonAction ? (
        <Button
          onClick={() => buttonAction()}
          icon={icon}
          color={color}
          size={size}
        >
          {buttonTitle}
        </Button>
      ) : name === 0 ? (
        name + 1
      ) : (
        name + 1
      )}
    </Table.Cell>
  );
};

export default TableCell;
