import React from "react";
import { Form } from "semantic-ui-react";
import { FField, FGroup, FInput } from "./index";

const Filter = ({ auctionsFilter, onSubmitFilter }) => {
  return (
    <Form>
      <FGroup>
        <FField>
          <FInput
            placeholder="Busca por filtro"
            name="auctionsFilter"
            value={auctionsFilter}
            onChange={onSubmitFilter}
            icon="search"
          />
        </FField>
      </FGroup>
    </Form>
  );
};

export default Filter;
