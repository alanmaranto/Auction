import React from "react";
import { Button, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

export const TableRow = ({ dataRow, columns, buttonAction }) => (
  <Table.Row>
    {columns &&
      columns.map(({ name, buttonActions }) => (
        <Table.Cell>
          {buttonActions ? (
            <Button
              onClick={() => buttonAction(dataRow)}
              color={"twitter"}
              icon={"heart outline"}
            />
          ) : (
            dataRow[name]
          )}
        </Table.Cell>
      ))} 
  </Table.Row>
);

TableRow.propTypes = {
  dataRow: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};
