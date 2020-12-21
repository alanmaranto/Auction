import React from "react";
import { Form } from "semantic-ui-react";
import "./style.css";

const Overview = ({
  values,
  onChange,
  isPrivate,
  setIsPrivate,
  currency,
  setCurrency,
}) => {

  return (
    <Form>
      <Form.Group inline>
        <label>Visibilidad</label>
        <Form.Radio
          label="Privada"
          value={isPrivate}
          checked={isPrivate}
          onChange={setIsPrivate}
        />
        <Form.Radio label="Pública" value="" disabled />
      </Form.Group>
      <Form.Group>
        <Form.Input
          label="Nombre de la subasta"
          placeholder="Nombre de la subasta"
          width={8}
          type="text"
          value={values.title}
          name="title"
          required
          onChange={onChange("title")}
        />
        <Form.Input
          label="Identificador"
          placeholder="Identificador"
          width={8}
          type="text"
          value={values.identifier}
          onChange={onChange("identifier")}
        />
      </Form.Group>
      <Form.Group>
        <Form.TextArea
          label="Descripción"
          placeholder="Descripción..."
          width={16}
          value={values.description}
          onChange={onChange("description")}
        />
      </Form.Group>

      <label>Moneda</label>
      <Form.Group>
        <Form.Radio
          label="MXN"
          value="mxn"
          checked={currency === "mxn"}
          onChange={setCurrency}
        />
        <Form.Radio
          label="USD"
          value="usd"
          checked={currency === "usd"}
          onChange={setCurrency}
        />
        <Form.Radio
          label="EUR"
          value="eur"
          checked={currency === "eur"}
          onChange={setCurrency}
        />
      </Form.Group>
    </Form>
  );
};

export default Overview;
