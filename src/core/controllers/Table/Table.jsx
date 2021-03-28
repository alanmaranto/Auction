import React from "react";
import PropTypes from "prop-types";
import { Table, Menu, Icon } from "semantic-ui-react";

import { PageSizeSelect } from "./PageSizeSelect.jsx";
import { TableRow } from "./TableRow.jsx";
import { TableHeader } from "./TableHeader.jsx";

import "./style.css";

const CoreTable = (props) => {
  const {
    title,
    dataSource,
    columns,
    colorTable,
    pageSelector,
    paginated,
  } = props;

  const { limit, onChangeLimit } = pageSelector || {};

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
      <Table
        size="small"
        color={colorTable || "blue"}
        className="custom-table"
        compact
        fixed
        celled
        structured
        unstackable
      >
        <TableHeader columns={columns} />
        <Table.Body colSpan="16">
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
        {paginated ? (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        ) : (
          []
        )}
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
