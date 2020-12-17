import React, { useState } from "react";
import { Form, Button, Card, Checkbox } from "semantic-ui-react";
import { isAuthenticated } from "../../../helpers/authenticate";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

registerLocale("es", es);

const Overview = ({
  values,
  onChange,
  nextStep,
  isPrivate,
  setIsPrivate,
  visibleDates,
  setVisibleDates,
  openingAuctionProjectDate,
  setOpeningAuctionProjectDate,
  endingAuctionProjectDate,
  setEndingAuctionProjectDate,
  openingRFIDate,
  setOpeningRFIDate,
  endingRFIDate,
  setEndingRFIDate,
  openingFADate,
  setOpeningFADate,
  endingFADate,
  setEndingFADate,
  currency,
  setCurrency,
}) => {
  console.log(values);

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
      <Form.Field>
        <Checkbox
          label="¿Fechas visibles?"
          value={visibleDates}
          checked={visibleDates ? true : false}
          onChange={() => setVisibleDates(!visibleDates)}
        />
      </Form.Field>

      {/* // RFI */}
      <label className="label-date-title">RFI</label>
      <Form.Field
        width={14}
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 30,
        }}
      >
        <label>Inicia</label>
        <DatePicker
          selected={openingRFIDate}
          onChange={(date) => setOpeningRFIDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="Pp"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
        />
        <label>Termina</label>
        <DatePicker
          selected={endingRFIDate}
          onChange={(date) => setEndingRFIDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="Pp"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
        />
      </Form.Field>

      {/* FA */}
      <label className="label-date-title">
        Foro Aclaraciones / Propuesta Técnica
      </label>
      <Form.Field
        width={14}
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 30,
        }}
      >
        <label>Inicia</label>
        <DatePicker
          selected={openingFADate}
          onChange={(date) => setOpeningFADate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="Pp"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
        />
        <label>Termina</label>
        <DatePicker
          selected={endingFADate}
          onChange={(date) => setEndingFADate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="Pp"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
        />
      </Form.Field>

      {/* REALITIME */}
      <label className="label-date-title">Subasta en vivo</label>
      <Form.Field
        width={14}
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 30,
        }}
      >
        <label>Inicia</label>
        <DatePicker
          selected={openingAuctionProjectDate}
          onChange={(date) => setOpeningAuctionProjectDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="Pp"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
        />
        <label>Termina</label>
        <DatePicker
          selected={endingAuctionProjectDate}
          onChange={(date) => setEndingAuctionProjectDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="Pp"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
        />
      </Form.Field>
      <label>Moneda</label>
      <Form.Group>
        <Form.Radio
          label="MXN"
          value="mxn"
          checked={currency === "mxn"}
          onChange={(e, { currency }) => setCurrency({ currency })}
        />
        <Form.Radio
          label="USD"
          value="usd"
          checked={currency === "usd"}
          onChange={(e, { currency }) => setCurrency({ currency })}
        />
        <Form.Radio
          label="EUR"
          value="eur"
          checked={currency === "eur"}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default Overview;
