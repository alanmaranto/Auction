import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const SummaryComponent = ({ filter, columns, data }) => {
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
            .sort((a, b) => (filter ? b[filter] - a[filter] : a - b))
            .map((row, index) => (
              <tr key={row._id}>
                <td>
                  <span>{index + 1}</span>
                </td>
                <td>{row.provider[0].name}</td>
                <td>{row.bid}</td>
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
  columns: PropTypes.arrayOf(),
  data: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    bid: PropTypes.number.isRequired,
  }),
};

export default SummaryComponent;
