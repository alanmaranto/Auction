import React from "react";
import { Button, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

import './style.css'

export const TableRow = ({
  dataRow,
  columns,
  buttonAction,
  buttonTitle,
  color,
  role,
}) => {
  return (
    <Table.Row className="auction">
      {columns &&
        columns.map(({ name, buttonActions }) => {
          return (
            <Table.Cell>
              {buttonActions ? (
                <Button
                  onClick={
                    role === "buyer" || "admin"
                      ? () => buttonAction(dataRow._id, dataRow)
                      : () => buttonAction(dataRow.auctionId)
                  }
                  color={color}
                >
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
