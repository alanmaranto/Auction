import React from "react";
import { Button, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

export const TableRow = ({ dataRow, columns }) => {
  return (
    <Table.Row>
      {columns &&
        columns.map(({ name, renderData, width }) => {
          return (
            <Table.Cell negative={dataRow.negative || false}>
              {renderData ? renderData(dataRow) : dataRow[name]}
            </Table.Cell>
          );
        })}
    </Table.Row>
  );
};

TableRow.propTypes = {
  dataRow: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};
