import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import "../style.css";

const Overview = ({
  values,
  onChange,
  isPrivate,
  setIsPrivate,
  currency,
  setCurrency,
  isOpenAuction,
  setIsOpenAuction
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
      <Form.Group>
        <Form.Input
          label="Mejora mínima (%)"
          placeholder=""
          width={4}
          type="text"
          value={values.minimumBid}
          name="minimumBid"
          required
          onChange={onChange("minimumBid")}
        />
        <Form.Input
          width={4}
          label="Tiempo de prórroga (min)"
          placeholder=""
          type="number"
          value={values.extensionTime}
          required
          onChange={onChange("extensionTime")}
        />
      </Form.Group>

      <label>Moneda</label>
      <Form.Group>
        <Form.Radio
          label="MXN"
          value="MXN"
          checked={currency === "MXN"}
          onChange={setCurrency}
        />
        <Form.Radio
          label="USD"
          value="USD"
          checked={currency === "USD"}
          onChange={setCurrency}
        />
        <Form.Radio
          label="EUR"
          value="EUR"
          checked={currency === "EUR"}
          onChange={setCurrency}
        />
      </Form.Group>
      <Form.Group>
        <Checkbox
          label="¿Es subasta abierta?"
          value={isOpenAuction}
          checked={isOpenAuction ? true : false}
          onChange={() => setIsOpenAuction(!isOpenAuction)}
          style={{ paddingLeft: 10}}
        />
      </Form.Group>
    </Form>
  );
};

export default Overview;
