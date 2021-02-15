import React from "react";
import { Button, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

export const TableRow = ({ dataRow, columns }) => {
  let finalColumns = columns;
  if (columns && typeof columns[0] === "object") {
    finalColumns = [];
    columns.forEach((currentColumn) => {
      currentColumn.forEach((data) => {
        if (!data.isHeader) finalColumns.push(data);
      });
    });
  }

  return (
    <Table.Row>
      {finalColumns &&
        finalColumns.map(({ textAlign, name, renderData, width }) => {
          return (
            <Table.Cell
              negative={dataRow.negative || false}
              positive={dataRow.positive || false}
              textAlign={textAlign}
            >
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
