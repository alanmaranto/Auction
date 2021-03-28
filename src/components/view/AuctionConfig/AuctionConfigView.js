import React, { useState } from "react";
import { Grid, Button, Message, Form, Card } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import DatePicker, { registerLocale } from "react-datepicker";
import AuctionSubContainer from "../AuctionWaitingView/AuctionWaitingContainer";
import {
  AuctionHeader,
  SuppliersTable,
  Menu,
  MoveToStepModal,
} from "./components";
import Posts from "./components/faPosts/Posts";
import { getNextStep, getAcceptedSuppliers } from "./helper";
import { updateAuction } from "../../../api/api";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import "./style.css";
import { isAuthenticated } from "../../../helpers/authenticate";
registerLocale("es", es);

const AuctionConfigView = ({ fetchAuction, auction, auctionId }) => {
  const { addToast } = useToasts();
  const [fetchMissingSuppliers, setChagedSuppliers] = useState(false);
  const [openMoveToStepModal, setOpenMoveToStepModal] = useState(false);
  const [newEndingRFIDate, setNewEndingRFIDate] = useState("");
  const [newOpeningFADate, setNewOpeningFADate] = useState("");
  const [newEndingFADate, setNewEndingFADate] = useState("");
  const [newOpeningRealTimeDate, setNewOpeningRealTimeDate] = useState("");
  const [newEndingRealTimeDate, setNewEndingRealTimeDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    auctionStep,
    title,
    description,
    suppliers,
    endingRFIDate,
    endingFADate,
  } = auction;

  const nexStep = getNextStep(auctionStep || "");
  const acceptedSuppliers = getAcceptedSuppliers(suppliers || []);

  const today = new Date().toISOString();

  const datesValidation = [
    `La fecha para este paso ha finalizado`,
    "Para continuar deberás elegir nuevas fechas para los siguientes pasos",
  ];

  const editDates = async () => {
    const { token } = isAuthenticated();
    setIsLoading(true);

    let data;

    if (auctionStep === "rfi") {
      data = {
        endingRFIDate: newEndingRFIDate,
        openingFaDate: newOpeningFADate,
        endingFADate: newEndingFADate,
        openingRealTimeAuctionDate: newOpeningRealTimeDate,
        endingRealTimeAuctionDate: newEndingRealTimeDate,
        extendedRealTimeAuctionDate: newEndingRealTimeDate
      };
    } else if (auctionStep === "fa_hl") {
      data = {
        endingFADate: newEndingFADate,
        openingRealTimeAuctionDate: newOpeningRealTimeDate,
        endingRealTimeAuctionDate: newEndingRealTimeDate,
        extendedRealTimeAuctionDate: newEndingRealTimeDate
      };
    }

    const response = await updateAuction(auctionId, token, data);

    console.log('response', response)

    if (response.status === 200) {
      addToast("Fechas actualizadas con éxito", {
        appearance: "success",
        autoDismiss: true,
      });
      fetchAuction();
      setIsLoading(false);
    } else {
      addToast("Hubo un error al actualizar las fechas", {
        appearance: "error",
        autoDismiss: true,
      });
      setIsLoading(false);
    }
  };

  const renderWarningDate = () => (
    <Grid.Row>
      <Grid.Column
        mobile={16}
        tablet={16}
        computer={16}
        largeScreen={16}
        widescreen={16}
      >
        <Message
          warning
          header="Información importante"
          list={datesValidation}
          color="blue"
        />
      </Grid.Column>
    </Grid.Row>
  );

  const renderRealTimeDates = () => (
    <>
      <label className="auction-config-form__label">Subasta en vivo</label>
      <Form.Field
        width={16}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label>Inicia</label>
        <DatePicker
          selected={newOpeningRealTimeDate}
          onChange={(date) => setNewOpeningRealTimeDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="Pp"
          locale="es"
          minDate={newEndingFADate || new Date()}
          placeholderText={newEndingFADate || new Date()}
          fixedHeight
        />
        <label>Termina</label>
        <DatePicker
          selected={newEndingRealTimeDate}
          onChange={(date) => setNewEndingRealTimeDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="Pp"
          locale="es"
          minDate={newOpeningRealTimeDate || new Date()}
          placeholderText={newOpeningRealTimeDate || new Date()}
          fixedHeight
        />
      </Form.Field>
    </>
  );

  return (
    <>
      <Grid textAlign="left" padded columns={16}>
        <Grid.Column width={16}>
          <AuctionHeader
            auctionStep={auctionStep}
            title={title}
            description={description}
          />
        </Grid.Column>
        {auctionStep === "rfi" && endingRFIDate > today && (
          <>
            <Grid.Column
              width={16}
              textAlign="right"
              style={{ paddingRight: "20px" }}
            >
              <MoveToStepModal
                open={openMoveToStepModal}
                setOpen={setOpenMoveToStepModal}
                nexStep={nexStep}
                suppliers={acceptedSuppliers}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionStep={auctionStep}
              />
              {acceptedSuppliers.length ? (
                <Button
                  color="primary"
                  labelPosition="right"
                  icon="right chevron"
                  content={`mover a ${nexStep}`}
                  onClick={() => setOpenMoveToStepModal(true)}
                />
              ) : (
                []
              )}
            </Grid.Column>
            <Grid.Column width={11} style={{ background: "#FFF" }}>
              <SuppliersTable
                auctionStep={auctionStep}
                suppliers={suppliers}
                auctionId={auctionId}
                fetch={() => {
                  setChagedSuppliers(true);
                  fetchAuction();
                }}
              />
            </Grid.Column>
            <Grid.Column width={5} style={{ background: "#FFF" }}>
              <Menu
                auctionStep={auctionStep}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionFiles={auction?.files || []}
                fetchMissingSuppliers={fetchMissingSuppliers}
                setChagedSuppliers={setChagedSuppliers}
              />
            </Grid.Column>
          </>
        )}
        {auctionStep === "rfi" && endingRFIDate < today && (
          <>
            {renderWarningDate()}
            <Grid.Row>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={16}
                largeScreen={16}
                widescreen={16}
              >
                <Card fluid>
                  <Card.Content>
                    <Form className="auction-config-form" onSubmit={editDates}>
                      <label className="auction-config-form__label">RFI</label>
                      <Form.Field
                        width={16}
                        style={{
                          display: "flex",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            aligItems: "center",
                            paddingRight: "78px",
                          }}
                        >
                          Termina
                        </label>
                        <DatePicker
                          selected={newEndingRFIDate}
                          onChange={(date) => setNewEndingRFIDate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="Pp"
                          locale="es"
                          minDate={new Date()}
                          placeholderText={new Date()}
                          fixedHeight
                        />
                      </Form.Field>
                      <label className="auction-config-form__label">
                        Foro de aclararaciones / propuesta técnica
                      </label>
                      <Form.Field
                        width={16}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <label>Inicia</label>
                        <DatePicker
                          selected={newOpeningFADate}
                          onChange={(date) => setNewOpeningFADate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="Pp"
                          locale="es"
                          minDate={newEndingRFIDate || new Date()}
                          placeholderText={newEndingRFIDate || new Date()}
                          fixedHeight
                        />
                        <label>Termina</label>
                        <DatePicker
                          selected={newEndingFADate}
                          onChange={(date) => setNewEndingFADate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="Pp"
                          locale="es"
                          minDate={newOpeningFADate || new Date()}
                          placeholderText={newOpeningFADate || new Date()}
                          fixedHeight
                        />
                      </Form.Field>
                      {renderRealTimeDates()}
                      <Button loading={isLoading} primary floated="right">
                        Actualizar Fechas
                      </Button>
                    </Form>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </>
        )}
        {auctionStep === "fa_hl" && endingFADate > today && (
          <>
            <Grid.Column
              width={16}
              textAlign="right"
              style={{ paddingRight: "20px" }}
            >
              <MoveToStepModal
                open={openMoveToStepModal}
                setOpen={setOpenMoveToStepModal}
                nexStep={nexStep}
                suppliers={acceptedSuppliers}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionStep={auctionStep}
              />
              {acceptedSuppliers.length ? (
                <Button
                  color="primary"
                  labelPosition="right"
                  icon="right chevron"
                  content={`mover a ${nexStep}`}
                  onClick={() => setOpenMoveToStepModal(true)}
                />
              ) : (
                []
              )}
            </Grid.Column>
            <Grid.Column
              width={11}
              style={{
                background: "#FFF",
              }}
            >
              <SuppliersTable
                auctionStep={auctionStep}
                suppliers={suppliers}
                auctionId={auctionId}
                fetch={() => {
                  setChagedSuppliers(true);
                  fetchAuction();
                }}
              />
            </Grid.Column>
            <Grid.Column
              width={5}
              style={{
                background: "#FFF",
              }}
            >
              <Menu
                auctionStep={auctionStep}
                auctionId={auctionId}
                fetchAuction={fetchAuction}
                auctionFiles={auction?.files || []}
                fetchMissingSuppliers={fetchMissingSuppliers}
                setChagedSuppliers={setChagedSuppliers}
              />
              <Posts auctionId={auctionId} />
            </Grid.Column>
          </>
        )}
        {auctionStep === "fa_hl" && endingFADate < today && (
          <>
            {renderWarningDate()}
            <Grid.Row>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={16}
                largeScreen={16}
                widescreen={16}
              >
                <Card fluid>
                  <Card.Content>
                    <Form className="auction-config-form" onSubmit={editDates}>
                      <label className="auction-config-form__label">
                        Foro de aclaraciones / propuesta técnica
                      </label>
                      <Form.Field
                        width={16}
                        style={{
                          display: "flex",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            aligItems: "center",
                            paddingRight: "78px",
                          }}
                        >
                          Termina
                        </label>
                        <DatePicker
                          selected={newEndingFADate}
                          onChange={(date) => setNewEndingFADate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="Pp"
                          locale="es"
                          minDate={new Date()}
                          placeholderText={new Date()}
                          fixedHeight
                        />
                      </Form.Field>
                      {renderRealTimeDates()}
                      <Button loading={isLoading} primary floated="right">
                        Actualizar Fechas
                      </Button>
                    </Form>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </>
        )}
        {auctionStep === "sub" && <AuctionSubContainer auctionId={auctionId} />}
      </Grid>
    </>
  );
};

export default AuctionConfigView;
