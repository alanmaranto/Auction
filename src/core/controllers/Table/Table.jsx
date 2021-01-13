import React from "react";
import PropTypes from "prop-types";
import { Table, Pagination } from "semantic-ui-react";

import { PageSizeSelect } from "./PageSizeSelect.jsx";
import { TableRow } from "./TableRow.jsx";
import { TableHeader } from "./TableHeader.jsx";

import "./style.css";

const CoreTable = (props) => {
  const {
    title,
    dataSource,
    totalPages,
    currentPage,
    onChangePage,
    columns,

    colorTable,
    header,
    pageSelector,
  } = props;

  const { limit, onChangeLimit } = pageSelector || {};
  const { column, direction, handleSort } = header || {};

  if (!dataSource) {
    return <React.Fragment />;
  } 
  
  return (
    <>
      {pageSelector ? (
        <PageSizeSelect limit={limit} onChangeLimit={onChangeLimit} />
      ) : (
        []
      )}
      {title}
      <Table color={colorTable || "blue"} className="custom-table">
        <TableHeader columns={columns} />
        <Table.Body>
          {dataSource.map((rowElement, index) => (
            <TableRow
              key={index}
              dataRow={rowElement}
              buttonAction={props.buttonAction}
              columns={props.columns}
              buttonTitle={props.buttonTitle}
              color={props.color}
            />
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <Pagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={(event, data) => {
                  onChangePage(data.activePage);
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

CoreTable.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
};

export default CoreTable;
