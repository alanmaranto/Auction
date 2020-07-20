import React from "react";
import PropTypes from "prop-types";
import { Table, Pagination } from "semantic-ui-react";

import { PageSizeSelect } from "./PageSizeSelect.jsx";
import { TableRow } from "./TableRow.jsx";
import { TableHeader } from "./TableHeader.jsx";

export const AuctionTable = (props) => {
  if (!props.dataSource) {
    return <React.Fragment />;
  }
  const tableRows = props.dataSource.map((rowElement, index) => {
  return (
    <TableRow
      key={index}
      dataRow={rowElement}
      buttonAction={props.buttonAction}
      columns={props.columns}
      buttonTitle={props.buttonTitle}
      color={props.color}
    />
  )});
  return (
    <React.Fragment>
      <PageSizeSelect limit={props.limit} onChangeLimit={props.onChangeLimit} />
      Subastas Totales: {props.totalCount}.
      <Table color={props.colorTable} padded /* selectable sortable */>
        <TableHeader
          column={props.column}
          direction={props.direction}
          handleSort={props.handleSort}
          columns={props.columns}
        />

        <Table.Body>{tableRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              <Pagination
                totalPages={props.totalPages}
                activePage={props.currentPage}
                onPageChange={(event, data) => {
                  props.onChangePage(data.activePage);
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};

AuctionTable.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
};
