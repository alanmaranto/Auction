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
  openingRFIDate,
  setOpeningRFIDate,
  endingRFIDate,
  setEndingRFIDate,
  openingFADate,
  setOpeningFADate,
  endingFADate,
  setEndingFADate,
  openingRealTimeAuctionDate,
  setOpeningRealTimeAuctionDate,
  endingRealTimeAuctionDate,
  setEndingRealTimeAuctionDate,
}) => {
  const filterOpeningRFI = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const result = currentDate.getTime() < selectedDate.getTime();
    return result;
  };

  const filterEndingRFI = (time) => {
    const currentDate = new Date(time);
    const result =
      openingRFIDate && openingRFIDate.getTime() < currentDate.getTime();
    return result;
  };

  const filterOpeningFA = (time) => {
    const currentDate = new Date(time);
    const result =
      endingRFIDate && endingRFIDate.getTime() < currentDate.getTime();
    return result;
  };

  const filterEndingFA = (time) => {
    const currentDate = new Date(time);
    const result =
      openingFADate && openingFADate.getTime() < currentDate.getTime();
    return result;
  };

  const filterOpeningRealTime = (time) => {
    const currentDate = new Date(time);
    const result =
      endingFADate && endingFADate.getTime() < currentDate.getTime();
    return result;
  };
  const filterEndingRealTime = (time) => {
    const currentDate = new Date(time);
    const result =
      openingRealTimeAuctionDate &&
      openingRealTimeAuctionDate.getTime() < currentDate.getTime();
    return result;
  };

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
          timeIntervals={60}
          timeCaption="time"
          minDate={new Date()}
          locale="es"
          placeholderText={new Date()}
          fixedHeight
          filterTime={filterOpeningRFI}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <DatePicker
          selected={endingRFIDate}
          onChange={(date) => setEndingRFIDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          locale="es"
          minDate={openingRFIDate || new Date()}
          placeholderText={openingRFIDate || new Date()}
          fixedHeight
          filterTime={filterEndingRFI}
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
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          locale="es"
          minDate={endingRFIDate || new Date()}
          placeholderText={endingRFIDate || new Date()}
          fixedHeight
          filterTime={filterOpeningFA}
        />
        <label>Termina</label>
        <DatePicker
          selected={endingFADate}
          onChange={(date) => setEndingFADate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          locale="es"
          minDate={openingFADate || new Date()}
          placeholderText={openingFADate || new Date()}
          fixedHeight
          filterTime={filterEndingFA}
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
          selected={openingRealTimeAuctionDate}
          onChange={(date) => setOpeningRealTimeAuctionDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          locale="es"
          minDate={endingFADate || new Date()}
          placeholderText={endingFADate || new Date()}
          fixedHeight
          filterTime={filterOpeningRealTime}
        />
        <label>Termina</label>
        <DatePicker
          selected={endingRealTimeAuctionDate}
          onChange={(date) => setEndingRealTimeAuctionDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          locale="es"
          minDate={openingRealTimeAuctionDate || new Date()}
          placeholderText={openingRealTimeAuctionDate || new Date()}
          fixedHeight
          filterTime={filterEndingRealTime}
        />
      </Form.Field>
      <Form.Group>
        <Checkbox
          label="¿Fechas visibles?"
          value={visibleDates}
          checked={visibleDates ? true : false}
          onChange={() => setVisibleDates(!visibleDates)}
          style={{ paddingLeft: 10 }}
        />
      </Form.Group>
    </Form>
  );
};

export default ProjectDates;
