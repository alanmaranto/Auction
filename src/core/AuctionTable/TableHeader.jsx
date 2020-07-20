import { Table } from "semantic-ui-react";
import React from "react";

export function TableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        {props.columns &&
        props.columns.map(({ name, title, sorted }) => (
          <Table.HeaderCell
            width={1}
            sorted={sorted ? sorted: null}
            // onClick={() => props.handleSort(name)}
          >
            {
              title
            }
            </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
