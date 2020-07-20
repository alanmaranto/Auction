import React from "react";
import { Button, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

export const TableRow = ({ dataRow, columns, buttonAction, buttonTitle, color }) => {
  return (
    <Table.Row>
      {columns &&
        columns.map(({ name, buttonActions }) => {
          console.log("name", name);
          return (
            <Table.Cell>
              {buttonActions ? (
                <Button onClick={() => buttonAction(dataRow._id)} color={color}>
                  {buttonTitle}
                </Button>
              ) : (
                dataRow[name]
              )}
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
