import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "../style.css";
registerLocale("es", es);

const ProjectDates = ({
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
  extensionTime,
  setExtensionTime,
  onChange,
}) => {
  return (
    <Form className="project-date-container">
      {/* // RFI */}
      <label className="project-date-container__label-date-title">RFI</label>
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
          fixedHeight
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
          fixedHeight
        />
      </Form.Field>

      {/* FA */}
      <label className="project-date-container__label-date-title">
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
          fixedHeight
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
          fixedHeight
          withPortal
        />
      </Form.Field>

      {/* REALITIME */}
      <label className="project-date-container__label-date-title">
        Subasta en vivo
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
          fixedHeight
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
          fixedHeight
        />
      </Form.Field>
      <Form.Group>
        <Form.Input
          width={4}
          label="Tiempo de prórroga (min)"
          placeholder="5,10,15...etc"
          type="number"
          value={extensionTime}
          required
          onChange={onChange("extensionTime")}
        />
        <Checkbox
          label="¿Fechas visibles?"
          value={visibleDates}
          checked={visibleDates ? true : false}
          onChange={() => setVisibleDates(!visibleDates)}
          style={{ paddingLeft: 50}}
        />
      </Form.Group>
    </Form>
  );
};

export default ProjectDates;
