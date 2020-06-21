import React, { Fragment } from "react";
import { Dropdown } from "semantic-ui-react";

const limitOptions = [
  { key: "0", value: "10", text: "10" },
  { key: "1", value: "25", text: "25" },
  { key: "2", value: "50", text: "50" },
  { key: "3", value: "100", text: "100" },
];

export const PagesSizeSelect = ({
    limit,
    onChangeLimit
}) => (
  <Fragment>
  Resultados por página:{' '}
    <Dropdown
      inline
      options={limitOptions}
      defaultValue={limit}
      onChange={onChangeLimit}
    />
  </Fragment>
);
