import React from "react";
import { Table } from "semantic-ui-react";

export function TableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        {props.columns &&
          props.columns.map(({ name, title, sorted }, index) => (
            <Table.HeaderCell
              width={1}
              sorted={sorted ? sorted : null}
              key={index}
              // onClick={() => props.handleSort(name)}
            >
              {title}
            </Table.HeaderCell>
          ))}
      </Table.Row>
    </Table.Header>
  );
}
