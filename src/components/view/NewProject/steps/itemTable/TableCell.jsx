import React from "react";
import { Table, Button } from "semantic-ui-react";

const TableCell = ({
  index,
  name,
  buttonAction,
  color,
  size,
  buttonTitle,
  icon,
}) => {
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
      ) : index > 0 ? (
        index + 1
      ) : (
        1
      )}
    </Table.Cell>
  );
};

export default TableCell;
