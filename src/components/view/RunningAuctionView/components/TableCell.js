import React from "react";
import { Table } from "semantic-ui-react";

const TableCell = ({ index, name }) => {
  return <Table.Cell>{name ? name : index > 0 ? index + 1 : 1}</Table.Cell>;
};

export default TableCell;
