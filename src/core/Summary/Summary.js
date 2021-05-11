import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import "./style.css";
import { formatCurrency } from "../../helpers/currency";

const SummaryComponent = ({
  filter,
  columns,
  data,
  isFinalized,
  chooseWinnerBid,
  currency,
}) => {
  return (
    <table className="summary-table">
      <thead>
        <tr>
          {columns.length > 0 &&
            columns.map((column) => <th key={column}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data
            .sort((a, b) => (filter ? a[filter] - b[filter] : a - b))
            .map((row, index) => (
              <tr key={row._id}>
                <td>
                  <span>{index + 1}</span>
                </td>
                <td>{row.provider[0].name}</td>
                <td>{currency && formatCurrency(row.bid, currency)}</td>
                {isFinalized ? (
                  <td>
                    <Button
                      onClick={() => chooseWinnerBid(row.auctionId)}
                      primary
                    >
                      Detalles
                    </Button>
                  </td>
                ) : null}
              </tr>
            ))
        ) : (
          <tr className="__no-data">
            <td>No hay información disponible</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

SummaryComponent.defaultProps = {
  filter: "",
  columns: [],
  data: [],
};

SummaryComponent.propTypes = {
  filter: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      bid: PropTypes.number,
    })
  ),
};

export default SummaryComponent;
