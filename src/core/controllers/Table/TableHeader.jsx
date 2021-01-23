import React from "react";
import { Table } from "semantic-ui-react";

export function TableHeader(props) {
  return (
    <Table.Header>
      {props?.columns && typeof props.columns[0] === "object" ? (
        props.columns.map((row, index) => (
          <Table.Row>
            {row.map(({ name, title, sorted, rowSpan, colSpan }) => (
              <Table.HeaderCell
                sorted={sorted ? sorted : null}
                key={`th-${name}-${title}-${index}`}
                rowSpan={rowSpan}
                colSpan={colSpan}
              >
                {title}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          {props.columns &&
            props.columns.map(({ name, title, sorted }, index) => (
              <Table.HeaderCell
                sorted={sorted ? sorted : null}
                key={`th-${name}-${title}-${index}`}
                // onClick={() => props.handleSort(name)}
              >
                {title}
              </Table.HeaderCell>
            ))}
        </Table.Row>
      )}
    </Table.Header>
  );
}
