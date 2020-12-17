import React, { Fragment, useState, useContext } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  GridColumn,
  GridRow,
  Tab,
  Icon,
  Card,
  Step,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "../../../modules/history/history";
import { useToasts } from "react-toast-notifications";
import { isAuthenticated } from "../../../helpers/authenticate";
import { createAuction } from "../../../api/auction";
import { getActiveAuctionsByUser } from "../../../api/auction";
import Overview from "./Overview";
import InvitationFiles from "./InvitationFiles";
import ItemsTable from "./ItemsTable";

import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

const NewAuction = () => {
  const { addToast } = useToasts();

  const [openingAuctionProjectDate, setOpeningAuctionProjectDate] = useState("");
  const [endingAuctionProjectDate, setEndingAuctionProjectDate] = useState("");
  const [openingRFIDate, setOpeningRFIDate] = useState("");
  const [endingRFIDate, setEndingRFIDate] = useState("");
  const [openingFADate, setOpeningFADate] = useState("");
  const [endingFADate, setEndingFADate] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [visibleDates, setVisibleDates] = useState(true);
  const [currency, setCurrency] = useState("mxn");

  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    title: "",
    identifier: "",
    description: "",
    // minimunPrice: null,
    minimumBid: null,
    finalized: false,
    error: "",
    redirectToAuction: false,
    createdAuction: "",
  });

  const { title, description, minimumBid /* minimunPrice */ } = values;
  const { token } = isAuthenticated();

  const onChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const fetchActiveAuctions = async () => {
    const response = await getActiveAuctionsByUser(token);

    if (response && response.status === 200) {
      setAuctions(response.data.body);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, error: "" });

    setLoading(true);

    const auction = {
      ...values,
      openingAuctionProjectDate,
      endingAuctionProjectDate,
      isPrivate,
      visibleDates
    };

    if (!title || !openingAuctionProjectDate || !endingAuctionProjectDate || !minimumBid) {
      addToast("Debes llenar los campos obligatorios", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      const response = await createAuction(token, auction);

      if (response.status === 201) {
        setLoading(false);
        fetchActiveAuctions();
        addToast("Subasta creada exitósamente", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push(`/`);
      } else {
        addToast("Hubo un error al crear la subasta", {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    }
  };

  const newAuctionForm = () => (
    <Fragment>
      <Grid verticalAlign="top" container centered columns={1}>
        <Grid.Column>
          <Header
            textAlign="center"
            style={{ color: "#142850", fontSize: "2em" }}
          >
            Información general del proyecto
          </Header>
          <Form size="large" onSubmit={onSubmit}>
            <Segment>
              <Form.Field label="Descripción de la subasta (Opcional)" />
              <Form.TextArea
                placeholder="Descripción (Opcional)"
                type="textarea"
                value={description}
                name="title"
                onChange={onChange("description")}
              />
              <Form.Field label="Precio base" required />
              {/*               <Form.Input
                placeholder="Es el precio con el que iniciará la subasta"
                type="number"
                value={minimunPrice}
                name="minimumPrice"
                onChange={onChange("minimumPrice")}
              /> */}
              <Form.Field label="Puja mínima recomendada" required />
              <Form.Input
                placeholder="Es la puja que recomiendas que hagan los proveedores"
                type="number"
                value={minimumBid}
                name="minimumBid"
                onChange={onChange("minimumBid")}
              />
              <Grid
                style={{ paddingTop: "20px" }}
                textAlign="center"
                columns={2}
              >
                <GridRow>
                  <GridColumn>
                    <Link to="/">
                      <Button
                        fluid
                        compact
                        className="button-cancel-new-auction"
                        size="medium"
                      >
                        Cancelar
                      </Button>
                    </Link>
                  </GridColumn>
                  <GridColumn>
                    <Button
                      fluid
                      compact
                      className="button-submit-new-auction"
                      size="medium"
                    >
                      Enviar
                    </Button>
                  </GridColumn>
                </GridRow>
              </Grid>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Fragment>
  );

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ItemsTable
            values={values}
            onChange={onChange}
            // nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <InvitationFiles
            values={values}
            onChange={onChange}
            nextStep={nextStep}
            prevStep={prevStep}
            onSubmit={onSubmit}
          />
        );
      default:
        return (
          <Overview
            values={values}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            visibleDates={visibleDates}
            setVisibleDates={setVisibleDates}
            openingAuctionProjectDate={openingAuctionProjectDate}
            endingAuctionProjectDate={endingAuctionProjectDate}
            setOpeningAuctionProjectDate={setOpeningAuctionProjectDate}
            setEndingAuctionProjectDate={setEndingAuctionProjectDate}
            openingRFIDate={openingRFIDate}
            endingRFIDate={endingRFIDate}
            setOpeningRFIDate={setOpeningRFIDate}
            setEndingRFIDate={setEndingRFIDate}
            openingFADate={openingFADate}
            endingFADate={endingFADate}
            setOpeningFADate={setOpeningFADate}
            setEndingFADate={setEndingFADate}
            onChange={onChange}
            nextStep={nextStep}
            currency={currency}
            setCurrency={setCurrency}
          />
        );
    }
  };

  const renderStepButtons = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <Button onClick={prevStep}>Regresar </Button>
            <Button onClick={nextStep}>Guardar y continuar </Button>
          </div>
        );
      case 2:
        return (
          <div>
            <Button onClick={prevStep}>Regresar </Button>
            <Button onClick={onSubmit}>Terminar proyecto </Button>
          </div>
        );
      default:
        return (
          <div>
            <Button onClick={nextStep}>Guardar y continuar </Button>
          </div>
        );
    }
  };

  const steps = [
    {
      key: "Overview",
      icon: "truck",
      title: "Overview",
      description: "Choose your shipping options",
      active: currentStep === 0 ? true : false,
    },
    {
      key: "ItemsTable",
      active: currentStep === 1 ? true : false,
      icon: "payment",
      title: "ItemsTable",
      description: "Enter billing information",
    },
    {
      key: "Invitation Providers",
      icon: "info",
      title: "Invitation Providers",
      active: currentStep === 2 ? true : false,
    },
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      {console.log(currentStep + 1 < steps.length)}
      {console.log(currentStep)}
      <div>
        <Header textAlign="left" style={{ color: "#142850", fontSize: "2em" }}>
          Información general del proyecto
        </Header>
        <Step.Group items={steps} />
      </div>
      <Card fluid>
        <Card.Content>
          <div style={{ paddingTop: 10 }}>{renderActiveStep()}</div>
          <div>{renderStepButtons()}</div>
        </Card.Content>
      </Card>
    </>
  );
};

export default NewAuction;
